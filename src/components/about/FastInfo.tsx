import { Users, BookOpen, Flag, Trophy } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const FastInfo = () => {
  const historySectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [year, setYear] = useState(2025);
  const [members, setMembers] = useState(0);
  const [teams, setTeams] = useState(0);
  const [rotationAngles, setRotationAngles] = useState<Record<string, number>>({
    jugend: 0,
  });
  const [animationCompleted, setAnimationCompleted] = useState({
    jugend: false,
  });

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
    if (isVisible) {
      const yearInterval = setInterval(() => {
        setYear(prev => prev > 1969 ? prev - 1 : 1969);
      }, 30);
      
      const membersInterval = setInterval(() => {
        setMembers(prev => prev < 30 ? prev + 1 : 30);
      }, 30);
      
      const teamsInterval = setInterval(() => {
        setTeams(prev => {
          if (prev < 1) return Math.min(prev + 0.05, 1);
          return 1;
        });
      }, 20);
      
      let angle = 0;
      const rotationInterval = setInterval(() => {
        angle = (angle + 5);
        
        setRotationAngles(prev => ({
          jugend: prev.jugend >= 360 ? 360 : angle,
        }));
        
        if (angle >= 360) {
          setAnimationCompleted({
            jugend: true,
          });
          clearInterval(rotationInterval);
        }
      }, 20);

      return () => {
        clearInterval(yearInterval);
        clearInterval(membersInterval);
        clearInterval(teamsInterval);
        clearInterval(rotationInterval);
      };
    }
  }, [isVisible]);

  const getCircleProgress = (item: any): number => {
    if (item.label === "Gegründet") {
      return (2025 - year) / (2025 - 1969);
    } else if (item.label === "Mitglieder") {
      return members / 30;
    } else if (item.label === "Teams") {
      return teams / 1;
    }
    return item.rotationKey ? Math.min(rotationAngles[item.rotationKey] / 360, 1) : 1;
  };

  const getTransitionDuration = (item: any): string => {
    if (item.label === "Teams") {
      return "0.8s";
    } else if (item.label === "Gegründet") {
      return "2s";
    } else if (item.label === "Mitglieder") {
      return "1s";
    } else {
      return "0.05s";
    }
  };

  const infoItems = [
    { icon: Flag, label: "Gegründet", value: Math.floor(year), delay: 0, rotationKey: null },
    { icon: Users, label: "Mitglieder", value: Math.floor(members), delay: 200, rotationKey: null },
    { icon: Trophy, label: "Teams", value: Math.floor(teams), delay: 400, rotationKey: null },
    { icon: BookOpen, label: "Jugend", value: "aktiv", delay: 600, rotationKey: "jugend" },
  ];

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
        {infoItems.map((item, index) => (
          <div 
            key={index} 
            className={`relative flex flex-col items-center transform transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${item.delay}ms` }}
          >
            <div className="relative w-36 h-36 md:w-44 md:h-44 mb-4">
              <div className="absolute inset-0 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center p-4 text-center z-10">
                  <item.icon className={`w-7 h-7 mb-2 text-gray-500`} />
                  <div className="font-medium text-gray-600 text-sm">{item.label}</div>
                  <div className="text-2xl font-bold mt-1 text-gray-800">
                    {typeof item.value === 'number' ? (
                      <span className="inline-block">{item.value}</span>
                    ) : (
                      <span className="inline-block" style={{ 
                        transform: `rotate(${item.rotationKey && !animationCompleted[item.rotationKey as keyof typeof animationCompleted] ? 
                          rotationAngles[item.rotationKey] % 10 - 5 : 0}deg)`,
                        transition: 'transform 0.2s ease-out'
                      }}>{item.value}</span>
                    )}
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
                    CIRCLE_CIRCUMFERENCE * (1 - getCircleProgress(item)) : 
                    CIRCLE_CIRCUMFERENCE
                  }
                  strokeLinecap="round"
                  style={{
                    transition: `stroke-dashoffset ${getTransitionDuration(item)} ease-out`
                  }}
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FastInfo;