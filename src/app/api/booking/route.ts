import { NextRequest, NextResponse } from 'next/server';
import { GoogleCalendarService } from '@/lib/google-calendar';

const calendarService = new GoogleCalendarService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, time, name, email, phone, message } = body;

    // Validate required fields
    if (!date || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create booking in Google Calendar
    const bookingData = {
      date: new Date(date),
      time: time || 'evening',
      attendeeName: name,
      attendeeEmail: email,
      message: message || '',
    };

    const success = await calendarService.createBookingEvent(bookingData);

    if (success) {
      // In production, you might also:
      // 1. Send confirmation email
      // 2. Save to database
      // 3. Send notification to calendar owner
      
      return NextResponse.json({
        success: true,
        message: 'Date booked successfully!',
        bookingId: `booking_${Date.now()}`,
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start');
    const endDate = searchParams.get('end');

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'Start and end dates are required' },
        { status: 400 }
      );
    }

    const availableDates = await calendarService.getAvailableDates(
      new Date(startDate),
      new Date(endDate)
    );

    return NextResponse.json({
      availableDates: availableDates.map(date => date.toISOString().split('T')[0]),
    });
  } catch (error) {
    console.error('Availability API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
