interface ApiHistoryItem {
  id: string;
  date: string;
  text: string;
}

interface TimelineEvent {
  date: string;
  text: string;
}

interface TimelineGroup {
  year: string;
  events: TimelineEvent[];
}

/**
 * Transforms API response into the timeline format
 * Handles date formats: yyyy.mm.dd, yyyy-yyyy, yyyy.mm, yyyy.mm.dd-mm.dd
 */
export function transformHistoryData(apiData: ApiHistoryItem[]): TimelineGroup[] {
  const groupedByYear: { [key: string]: TimelineEvent[] } = {};

  apiData.forEach(item => {
    const { year, displayDate } = parseDate(item.date);
    
    if (!groupedByYear[year]) {
      groupedByYear[year] = [];
    }

    groupedByYear[year].push({
      date: displayDate,
      text: item.text
    });
  });

  // Convert to array and sort by year (descending)
  const timeline: TimelineGroup[] = Object.keys(groupedByYear)
    .sort((a, b) => {
      // Handle year ranges like "1972-79" or "1972–1979"
      const yearA = parseInt(a.split(/[-–]/)[0]);
      const yearB = parseInt(b.split(/[-–]/)[0]);
      return yearB - yearA;
    })
    .map(year => ({
      year,
      events: groupedByYear[year]
    }));

  return timeline;
}

/**
 * Parses different date formats and returns the year and display date
 */
function parseDate(dateStr: string): { year: string; displayDate: string } {
  // Remove any whitespace
  dateStr = dateStr.trim();

  // Format: yyyy-yyyy or yyyy–yyyy (year range with regular or en dash)
  if (/^\d{4}[-–]\d{2,4}$/.test(dateStr)) {
    const [startYear, endYear] = dateStr.split(/[-–]/);
    // Display in short format (e.g., "1972–79")
    const shortEndYear = endYear.length === 2 ? endYear : endYear.substring(2);
    return {
      year: `${startYear}–${shortEndYear}`,
      displayDate: ''
    };
  }

  // Format: yyyy.mm.dd-mm.dd (date range within same month)
  if (/^\d{4}\.\d{2}\.\d{2}-\d{2}\.\d{2}$/.test(dateStr)) {
    const parts = dateStr.split('-');
    const [year, month, startDay] = parts[0].split('.');
    const [, endDay] = parts[1].split('.');
    return {
      year,
      displayDate: `${startDay}.${month}–${endDay}.${month}`
    };
  }

  // Format: yyyy.mm.dd-dd (date range within same month, short format)
  if (/^\d{4}\.\d{2}\.\d{2}-\d{2}$/.test(dateStr)) {
    const [datePart, endDay] = dateStr.split('-');
    const [year, month, startDay] = datePart.split('.');
    return {
      year,
      displayDate: `${startDay}.${month}–${endDay}.${month}`
    };
  }

  // Format: yyyy.mm.dd (full date)
  if (/^\d{4}\.\d{2}\.\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split('.');
    return {
      year,
      displayDate: `${day}.${month}`
    };
  }

  // Format: yyyy.mm (month and year)
  if (/^\d{4}\.\d{2}$/.test(dateStr)) {
    const [year, month] = dateStr.split('.');
    const monthNames = ['', 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    return {
      year,
      displayDate: monthNames[parseInt(month)] || month
    };
  }

  // Format: yyyy (year only)
  if (/^\d{4}$/.test(dateStr)) {
    return {
      year: dateStr,
      displayDate: ''
    };
  }

  // Fallback: treat as year
  const yearMatch = dateStr.match(/\d{4}/);
  if (yearMatch) {
    return {
      year: yearMatch[0],
      displayDate: dateStr
    };
  }

  return {
    year: 'Unknown',
    displayDate: dateStr
  };
}
