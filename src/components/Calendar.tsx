'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday, isPast } from 'date-fns';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

export function Calendar({ onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  // Fetch available dates from API
  const fetchAvailableDates = async (startDate: Date, endDate: Date) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/booking?start=${startDate.toISOString()}&end=${endDate.toISOString()}`
      );
      const data = await response.json();
      
      if (data.availableDates) {
        setAvailableDates(new Set(data.availableDates));
      }
    } catch (error) {
      console.error('Error fetching available dates:', error);
      // Fallback to mock data
      const mockDates = new Set<string>();
      const today = new Date();
      for (let i = 0; i < 90; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        if (date.getDay() !== 0 && date.getDay() !== 6 && Math.random() > 0.3) {
          mockDates.add(date.toISOString().split('T')[0]);
        }
      }
      setAvailableDates(mockDates);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);
    fetchAvailableDates(startDate, endDate);
  }, [currentMonth]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const isDateAvailable = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return availableDates.has(dateStr);
  };

  const handleDateClick = (date: Date) => {
    if (isDateAvailable(date) && !isPast(date)) {
      onDateSelect(date);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          disabled={loading}
          className="p-2 hover:bg-pink-100 rounded-full transition-colors disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <h3 className="text-xl font-semibold text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        
        <button
          onClick={nextMonth}
          disabled={loading}
          className="p-2 hover:bg-pink-100 rounded-full transition-colors disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {loading && (
        <div className="flex justify-center mb-4">
          <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isTodayDate = isToday(day);
          const isPastDate = isPast(day);
          const isAvailable = isDateAvailable(day);
          const isClickable = isAvailable && !isPastDate && isCurrentMonth;

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDateClick(day)}
              disabled={!isClickable}
              className={`
                p-3 text-sm rounded-lg transition-all duration-200
                ${!isCurrentMonth ? 'text-gray-300' : ''}
                ${isTodayDate ? 'bg-pink-500 text-white font-bold' : ''}
                ${isPastDate ? 'text-gray-400 cursor-not-allowed' : ''}
                ${isAvailable && !isPastDate && isCurrentMonth
                  ? 'hover:bg-pink-100 hover:scale-105 cursor-pointer text-gray-700'
                  : 'cursor-not-allowed'
                }
                ${!isAvailable && isCurrentMonth && !isPastDate
                  ? 'text-gray-400 cursor-not-allowed'
                  : ''
                }
              `}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <span className="text-gray-600">Unavailable</span>
        </div>
      </div>
    </div>
  );
}