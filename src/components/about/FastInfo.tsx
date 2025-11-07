import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import React from "react";

interface StatData {
  id: number;
  icon: string;
  label: string;
  targetValue: number;
  delay: number;
}

interface StatValue {
  [key: string]: number;
}

const FastInfo = () => {
  const historySectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [statValues, setStatValues] = useState<StatValue>({});
  const [statsData, setStatsData] = useState<StatData[]>([]);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('https://sc-laufenburg.de/api/fastinfo.php');
        if (response.ok) {
          const data = await response.json();
          setStatsData(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (historySectionRef.current) {
      observer.observe(historySectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && statsData.length > 0) {
      const initialValues: StatValue = {};
      statsData.forEach(stat => {
        initialValues[stat.label] = 0;
      });
      setStatValues(initialValues);

      const totalDuration = 4000;
      const updateInterval = 20;
      const totalSteps = totalDuration / updateInterval;

      const intervals: NodeJS.Timeout[] = [];
      const timeouts: NodeJS.Timeout[] = [];

      const easeOut = (progress: number): number => {
        if (progress < 0.4) {
          return progress;
        } else {
          const adjustedProgress = (progress - 0.4) / 0.6;
          const eased = 1 - Math.pow(1 - adjustedProgress, 4);
          return 0.4 + (eased * 0.6);
        }
      };

      statsData.forEach(stat => {
        let currentStep = 0;
        
        const startTimeout = setTimeout(() => {
          setVisibleItems(prev => new Set(prev).add(stat.label));
          
          const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / totalSteps;
            const easedProgress = easeOut(progress);
            const newValue = stat.targetValue * easedProgress;

            setStatValues(prev => {
              if (currentStep >= totalSteps) {
                return { ...prev, [stat.label]: stat.targetValue };
              }
              return {
                ...prev,
                [stat.label]: Math.min(newValue, stat.targetValue)
              };
            });
          }, updateInterval);

          intervals.push(interval);
        }, stat.delay);

        timeouts.push(startTimeout);
      });

      return () => {
        intervals.forEach(interval => clearInterval(interval));
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    }
  }, [isVisible, statsData]);

  const getCircleProgress = (label: string): number => {
    const currentValue = statValues[label] || 0;
    return currentValue > 0 ? 1 : 0;
  };

  const getTransitionDuration = (): string => {
    return "4s";
  };

  const getTransitionTimingFunction = (): string => {
    return "cubic-bezier(0.4, 0, 0.2, 1)";
  };

  const infoItems = statsData.map(stat => ({
    iconName: stat.icon,
    label: stat.label,
    value: Math.floor(statValues[stat.label] || 0),
    targetValue: stat.targetValue,
    delay: stat.delay,
  }));

  const CIRCLE_CIRCUMFERENCE = 295.31; // 2 * π * 47 (the radius)

  const theme = {
    primary: "#3b82f6",
    background: "white",
    text: "#1f2937",
    labelText: "#6b7280",
    iconColor: "#4b5563",
    trackColor: "#e5e7eb",
  };

  return (
    <div
      ref={historySectionRef}
      className="bg-white rounded-lg shadow-sm p-8 transition-all duration-1000"
    >
      <div className="flex flex-wrap justify-center gap-10">
        {infoItems.map((item, index) => {
          const isItemVisible = visibleItems.has(item.label);
          
          return (
            <div 
              key={index} 
              className={`relative flex flex-col items-center transform transition-all duration-700 ${
                isItemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative w-36 h-36 md:w-44 md:h-44 mb-4">
              <div className="absolute inset-0 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center p-4 text-center z-10">
                  {LucideIcons[item.iconName as keyof typeof LucideIcons] ? (
                    React.createElement(LucideIcons[item.iconName as keyof typeof LucideIcons] as LucideIcon, { 
                      className: "w-7 h-7 mb-2 text-gray-500" 
                    })
                  ) : null}
                  <div className="font-medium text-gray-600 text-sm">{item.label}</div>
                  <div className="text-2xl font-bold mt-1 text-gray-800">
                    <span className="inline-block">{item.value}</span>
                  </div>
                </div>
              </div>
              
              <svg 
                className="absolute inset-0 w-full h-full -rotate-90" 
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke={theme.trackColor}
                  strokeWidth="3"
                  className="opacity-40"
                />
              </svg>
              
              <svg 
                className="absolute inset-0 w-full h-full -rotate-90" 
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke={theme.primary}
                  strokeWidth="3"
                  strokeDasharray={CIRCLE_CIRCUMFERENCE}
                  strokeDashoffset={
                    isVisible ? 
                    CIRCLE_CIRCUMFERENCE * (1 - getCircleProgress(item.label)) : 
                    CIRCLE_CIRCUMFERENCE
                  }
                  strokeLinecap="round"
                  style={{
                    transition: `stroke-dashoffset ${getTransitionDuration()} ${getTransitionTimingFunction()}`
                  }}
                />
              </svg>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default FastInfo;