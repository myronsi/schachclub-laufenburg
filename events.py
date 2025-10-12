import json
import os
from datetime import datetime, timedelta, date
import ftplib
import os

# TODO: make so that all events starting with capital letter
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    env_path = os.path.join(os.getcwd(), '.env')
    if os.path.exists(env_path):
        try:
            with open(env_path, 'r', encoding='utf-8') as ef:
                for raw in ef:
                    line = raw.strip()
                    if not line or line.startswith('#'):
                        continue
                    if '=' not in line:
                        continue
                    k, v = line.split('=', 1)
                    k = k.strip()
                    v = v.strip().strip('"').strip("'")
                    if k and k not in os.environ:
                        os.environ[k] = v
            print('Loaded .env from project root')
        except Exception:
            pass

FILENAME = "calendarList.json"

CURRENT_DATE = date.today()

def load_events():
    """Load events from the JSON file if it exists, otherwise return an empty list."""
    if os.path.exists(FILENAME):
        with open(FILENAME, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_events(events):
    """Save the list of events to the JSON file, sorted by date."""
    events.sort(key=lambda e: datetime.strptime(e['date'], "%Y-%m-%d"))
    with open(FILENAME, 'w', encoding='utf-8') as f:
        json.dump(events, f, indent=2, ensure_ascii=False)
    print(f"Events saved to {FILENAME}.")
    upload_to_ftp()

def upload_to_ftp():
    """Upload calendarList.json to FTP server."""
    ftp_host = os.getenv('FTP_HOST')
    ftp_port = int(os.getenv('FTP_PORT') or 21)
    ftp_user = os.getenv('FTP_USER')
    ftp_pass = os.getenv('FTP_PASS')

    if not (ftp_host and ftp_user and ftp_pass):
        print('FTP credentials not found in environment; skipping upload.')
        return

    try:
        ftp = ftplib.FTP()
        ftp.connect(ftp_host, ftp_port)
        ftp.login(ftp_user, ftp_pass)
        with open(FILENAME, 'rb') as f:
            ftp.storbinary('STOR calendarList.json', f)
        ftp.quit()
        print("File uploaded to FTP successfully.")
    except Exception as e:
        print(f"FTP upload failed: {e}")

def add_months(source_date, months):
    """Add a given number of months to a date."""
    month = source_date.month - 1 + months
    year = source_date.year + month // 12
    month = month % 12 + 1
    day = min(source_date.day, [31,
               29 if (year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)) else 28,
               31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1])
    return source_date.replace(year=year, month=month, day=day)

def get_preset(title):
    """Get preset values based on title."""
    title_lower = title.strip().lower()
    if title_lower == "vereinsabend":
        return {
            "time": "18:30",
            "location": "Vereinsheim",
            "description": "Regelmäßiger Vereinsabend mit freiem Spiel",
            "type": "training"
        }
    elif title_lower == "jugendtraining":
        return {
            "time": "17:00",
            "location": "Vereinsheim",
            "description": "Wöchentliches Jugendtraining",
            "type": "training"
        }
    elif title_lower == "jahreshauptversammlung":
        return {
            "time": "18:00",
            "location": "Vereinsheim",
            "description": "Jahreshauptversammlung des Schachclubs",
            "type": "meeting"
        }
    return None

def add_new_event(events):
    """Add a new event with optional repeats."""
    title = input("Enter title: ").strip()
    date_str = input("Enter date (YYYY-MM-DD): ").strip()

    preset = get_preset(title)

    if preset:
        print(f"Using preset for '{title}'.")
        time = preset["time"]
        location = preset["location"]
        description = preset["description"]
        event_type = preset["type"]
    else:
        time = input("Enter time (HH:MM): ").strip()
        location = input("Enter location: ").strip()
        description = input("Enter description: ").strip()
        event_type = input("Enter type (e.g., training, tournament, meeting, special): ").strip()

    try:
        base_date = datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        print("Invalid date format. Skipping this event.")
        return

    base_event = {
        "title": title,
        "date": date_str,
        "time": time,
        "location": location,
        "description": description,
        "type": event_type
    }

    events.append(base_event)
    print("Base event added.")

    repeat = input("Do you want to repeat this event? (y/n): ").strip().lower()
    if repeat != 'y':
        return

    frequency = input("Enter frequency (daily/weekly/monthly): ").strip().lower()
    if frequency not in ['daily', 'weekly', 'monthly']:
        print("Invalid frequency. Skipping repeats.")
        return

    try:
        num_repeats = int(input("Enter number of additional occurrences: ").strip())
        if num_repeats < 1:
            raise ValueError
    except ValueError:
        print("Invalid number. Skipping repeats.")
        return

    for i in range(1, num_repeats + 1):
        if frequency == 'daily':
            new_date = base_date + timedelta(days=i)
        elif frequency == 'weekly':
            new_date = base_date + timedelta(weeks=i)
        elif frequency == 'monthly':
            new_date = add_months(base_date, i)
        
        new_date_str = new_date.strftime("%Y-%m-%d")
        new_event = base_event.copy()
        new_event['date'] = new_date_str
        events.append(new_event)
        print(f"Repeat event added for {new_date_str}.")

def edit_future_events(events):
    """Edit future events with a given title."""
    title = input("Enter title to edit: ").strip().lower()

    future_events = [e for e in events if e['title'].lower() == title and datetime.strptime(e['date'], "%Y-%m-%d").date() >= CURRENT_DATE]
    if not future_events:
        print("No future events with that title.")
        return

    future_events.sort(key=lambda e: datetime.strptime(e['date'], "%Y-%m-%d"))
    print(f"Found {len(future_events)} future events.")

    while True:
        field = input("What to change? (time, location, description, type, date, repeats, done): ").strip().lower()
        if field == 'done':
            break

        if field in ['time', 'location', 'description', 'type']:
            new_value = input(f"Enter new {field}: ").strip()
            for e in future_events:
                e[field] = new_value
            print(f"Updated {field} for all future events.")

        elif field == 'date':
            new_date_str = input("Enter new start date (YYYY-MM-DD): ").strip()
            try:
                new_base_date = datetime.strptime(new_date_str, "%Y-%m-%d")
                old_base_date = datetime.strptime(future_events[0]['date'], "%Y-%m-%d")
                delta = new_base_date - old_base_date
                for e in future_events:
                    old_date = datetime.strptime(e['date'], "%Y-%m-%d")
                    new_date = old_date + delta
                    e['date'] = new_date.strftime("%Y-%m-%d")
                print("Shifted all future dates by the delta.")
            except ValueError:
                print("Invalid date format.")

        elif field == 'repeats':
            print("To change repeats, we will recreate the series from the current first future event.")
            frequency = input("Enter frequency (daily/weekly/monthly): ").strip().lower()
            if frequency not in ['daily', 'weekly', 'monthly']:
                print("Invalid frequency.")
                continue

            try:
                num_repeats = int(input("Enter number of additional occurrences: ").strip())
                if num_repeats < 0:
                    raise ValueError
            except ValueError:
                print("Invalid number.")
                continue

            base_event = future_events[0].copy()

            future_ids = set(id(e) for e in future_events)
            events[:] = [e for e in events if id(e) not in future_ids]

            events.append(base_event)

            base_date = datetime.strptime(base_event['date'], "%Y-%m-%d")
            for i in range(1, num_repeats + 1):
                if frequency == 'daily':
                    new_date = base_date + timedelta(days=i)
                elif frequency == 'weekly':
                    new_date = base_date + timedelta(weeks=i)
                elif frequency == 'monthly':
                    new_date = add_months(base_date, i)
                
                new_date_str = new_date.strftime("%Y-%m-%d")
                new_event = base_event.copy()
                new_event['date'] = new_date_str
                events.append(new_event)
                print(f"New repeat event added for {new_date_str}.")

            print("Series recreated.")
            break

def delete_events(events):
    """Delete events based on user choice."""
    sub_choice = input("1: Delete all upcoming events with title\n2: Delete specific event on day\n3: Delete all events on a day\nEnter choice: ").strip()
    
    if sub_choice == '1':
        title = input("Enter title: ").strip().lower()
        future_events = [e for e in events if e['title'].lower() == title and datetime.strptime(e['date'], "%Y-%m-%d").date() >= CURRENT_DATE]
        if not future_events:
            print("No future events with that title.")
            return
        print(f"Deleting {len(future_events)} events.")
        future_ids = set(id(e) for e in future_events)
        events[:] = [e for e in events if id(e) not in future_ids]
    
    elif sub_choice == '2':
        date_str = input("Enter date (YYYY-MM-DD): ").strip()
        title = input("Enter title: ").strip().lower()
        try:
            event_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            print("Invalid date format.")
            return
        matching = [e for e in events if e['title'].lower() == title and datetime.strptime(e['date'], "%Y-%m-%d").date() == event_date]
        if not matching:
            print("No events found.")
            return
        if len(matching) > 1:
            print(f"Found {len(matching)} events with same title on that day. Deleting all.")
        matching_ids = set(id(e) for e in matching)
        events[:] = [e for e in events if id(e) not in matching_ids]
    
    elif sub_choice == '3':
        date_str = input("Enter date (YYYY-MM-DD): ").strip()
        try:
            event_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            print("Invalid date format.")
            return
        matching = [e for e in events if datetime.strptime(e['date'], "%Y-%m-%d").date() == event_date]
        if not matching:
            print("No events on that day.")
            return
        print(f"Deleting {len(matching)} events on {date_str}.")
        matching_ids = set(id(e) for e in matching)
        events[:] = [e for e in events if id(e) not in matching_ids]
    
    else:
        print("Invalid choice.")

def main():
    print(f"Loaded {len(load_events())} existing events.")
    print(f"Current date is {CURRENT_DATE}.")

    while True:
        choice = input("1: Add new event\n2: Edit future events\n4: Delete event(s)\n3: Quit\nEnter choice: ").strip()
        if choice == '3':
            break

        events = load_events()
        if choice == '1':
            add_new_event(events)
            save_events(events)
        elif choice == '2':
            edit_future_events(events)
            save_events(events)
        elif choice == '4':
            delete_events(events)
            save_events(events)
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    main()
