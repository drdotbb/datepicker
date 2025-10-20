'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { X, Check, Clock, User, MessageCircle } from 'lucide-react';

interface BookingFormProps {
  selectedDate: Date;
  onComplete: () => void;
  onCancel: () => void;
}

export function BookingForm({ selectedDate, onComplete, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    timePreference: 'evening'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const timeOptions = [
    { value: 'morning', label: 'Morning (9 AM - 12 PM)', icon: '🌅' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 5 PM)', icon: '☀️' },
    { value: 'evening', label: 'Evening (5 PM - 9 PM)', icon: '🌆' },
    { value: 'night', label: 'Night (9 PM - 11 PM)', icon: '🌙' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate.toISOString(),
          time: formData.timePreference,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onComplete();
        }, 3000);
      } else {
        setError(data.error || 'Failed to book date. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Date Booked! 🎉</h3>
        <p className="text-gray-600 mb-4">
          I'm so excited to spend time with you on {format(selectedDate, 'MMMM dd, yyyy')}!
        </p>
        <p className="text-sm text-gray-500">
          I'll send you a confirmation email shortly. See you soon! 💕
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Book Your Date</h3>
          <p className="text-gray-600">
            {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Your Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📧 Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📱 Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 inline mr-2" />
            Preferred Time
          </label>
          <div className="grid grid-cols-2 gap-3">
            {timeOptions.map((option) => (
              <label
                key={option.value}
                className={`
                  flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all
                  ${formData.timePreference === option.value
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300'
                  }
                `}
              >
                <input
                  type="radio"
                  name="timePreference"
                  value={option.value}
                  checked={formData.timePreference === option.value}
                  onChange={(e) => handleInputChange('timePreference', e.target.value)}
                  className="sr-only"
                />
                <span className="text-lg mr-2">{option.icon}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MessageCircle className="w-4 h-4 inline mr-2" />
            Special Message (Optional)
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
            placeholder="Tell me what you'd like to do or any special requests..."
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Booking...
              </div>
            ) : (
              'Book This Date! 💕'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}