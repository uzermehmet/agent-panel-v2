import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TrendData {
  value: string;
  label: string;
  direction: 'up' | 'down';
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: TrendData;
  color: 'blue' | 'green' | 'emerald' | 'purple' | 'amber' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color }) => {
  const getColorClass = (color: string, element: 'bg' | 'text' | 'border') => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200'
      },
      green: {
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200'
      },
      emerald: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200'
      },
      purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200'
      },
      amber: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200'
      },
      red: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200'
      }
    };
    
    return colorMap[color as keyof typeof colorMap][element];
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(235, 242, 254, 0.8)' }}>
          {icon}
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center justify-end text-sm">
          <span className={`inline-flex items-center ${
            trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.direction === 'up' ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            {trend.value}
          </span>
          <span className="ml-1.5 text-gray-500">{trend.label}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
