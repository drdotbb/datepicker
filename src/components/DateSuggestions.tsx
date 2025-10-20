'use client';

import { useState } from 'react';
import { Heart, Coffee, Camera, Utensils, Music, Sparkles } from 'lucide-react';
import { format, addDays, addWeeks } from 'date-fns';

interface DateSuggestionsProps {
  onSuggestionSelect: (date: Date) => void;
}

const dateSuggestions = [
  {
    id: 'weekend',
    title: 'This Weekend',
    description: 'Perfect for a relaxing time together',
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
    getDate: () => {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const daysUntilSaturday = (6 - dayOfWeek) % 7;
      return addDays(today, daysUntilSaturday);
    }
  },
  {
    id: 'coffee',
    title: 'Coffee Date',
    description: 'Let\'s grab coffee and chat',
    icon: Coffee,
    color: 'from-amber-500 to-orange-500',
    getDate: () => addDays(new Date(), 2)
  },
  {
    id: 'photo',
    title: 'Photo Walk',
    description: 'Explore the city and capture memories',
    icon: Camera,
    color: 'from-blue-500 to-cyan-500',
    getDate: () => addDays(new Date(), 3)
  },
  {
    id: 'dinner',
    title: 'Romantic Dinner',
    description: 'Fine dining and great conversation',
    icon: Utensils,
    color: 'from-purple-500 to-pink-500',
    getDate: () => addDays(new Date(), 5)
  },
  {
    id: 'music',
    title: 'Music Night',
    description: 'Live music and dancing',
    icon: Music,
    color: 'from-green-500 to-teal-500',
    getDate: () => addWeeks(new Date(), 1)
  },
  {
    id: 'surprise',
    title: 'Surprise Date',
    description: 'Let me plan something special',
    icon: Sparkles,
    color: 'from-indigo-500 to-purple-500',
    getDate: () => addDays(new Date(), 7)
  }
];

export function DateSuggestions({ onSuggestionSelect }: DateSuggestionsProps) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const handleSuggestionClick = (suggestion: typeof dateSuggestions[0]) => {
    setSelectedSuggestion(suggestion.id);
    const date = suggestion.getDate();
    onSuggestionSelect(date);
  };

  return (
    <div className="space-y-4">
      {dateSuggestions.map((suggestion) => {
        const Icon = suggestion.icon;
        const date = suggestion.getDate();
        const isSelected = selectedSuggestion === suggestion.id;

        return (
          <button
            key={suggestion.id}
            onClick={() => handleSuggestionClick(suggestion)}
            className={`
              w-full p-4 rounded-xl transition-all duration-300 transform hover:scale-105
              ${isSelected 
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg' 
                : 'bg-gradient-to-r from-gray-50 to-gray-100 hover:from-pink-50 hover:to-purple-50 text-gray-700'
              }
            `}
          >
            <div className="flex items-center space-x-4">
              <div className={`
                p-3 rounded-full
                ${isSelected 
                  ? 'bg-white/20' 
                  : `bg-gradient-to-r ${suggestion.color}`
                }
              `}>
                <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-white'}`} />
              </div>
              
              <div className="flex-1 text-left">
                <h3 className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                  {suggestion.title}
                </h3>
                <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
                  {suggestion.description}
                </p>
                <p className={`text-xs mt-1 ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                  {format(date, 'MMM dd, yyyy')}
                </p>
              </div>
              
              <div className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${isSelected 
                  ? 'bg-white/20 text-white' 
                  : 'bg-pink-100 text-pink-600'
                }
              `}>
                {format(date, 'MMM dd')}
              </div>
            </div>
          </button>
        );
      })}
      
      <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200">
        <p className="text-sm text-gray-600 text-center">
          💡 <strong>Pro tip:</strong> All suggestions are based on my real availability. 
          If a date isn't available, try another suggestion!
        </p>
      </div>
    </div>
  );
}
