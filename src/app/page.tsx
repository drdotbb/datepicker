'use client';

import { useState } from 'react';
import { Calendar } from '@/components/Calendar';
import { DateSuggestions } from '@/components/DateSuggestions';
import { BookingForm } from '@/components/BookingForm';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowBookingForm(true);
  };

  const handleBookingComplete = () => {
    setShowBookingForm(false);
    setSelectedDate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Let's Plan Something Amazing! 💕
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pick a perfect date and let's create beautiful memories together. 
              My calendar is synced in real-time, so you'll always see my availability.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                📅 Choose Your Perfect Date
              </h2>
              <Calendar onDateSelect={handleDateSelect} />
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                ✨ Quick Date Ideas
              </h2>
              <DateSuggestions onSuggestionSelect={handleDateSelect} />
            </div>
          </div>

          {showBookingForm && selectedDate && (
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <BookingForm 
                selectedDate={selectedDate}
                onComplete={handleBookingComplete}
                onCancel={() => setShowBookingForm(false)}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}