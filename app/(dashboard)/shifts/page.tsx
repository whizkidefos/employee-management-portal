'use client';

import { useState, useEffect } from 'react';
import { CalendarDaysIcon, MapPinIcon, CurrencyPoundIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { shiftsApi } from '@/app/lib/api';
import type { Shift } from '@/app/lib/api';

export default function ShiftsPage() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadShifts();
  }, []);

  const loadShifts = async () => {
    try {
      setIsLoading(true);
      const data = await shiftsApi.getAllShifts();
      setShifts(data);
    } catch (error) {
      toast.error('Failed to load shifts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookShift = async (shiftId: string) => {
    try {
      await shiftsApi.bookShift(shiftId);
      toast.success('Shift booked successfully');
      loadShifts();
    } catch (error) {
      toast.error('Failed to book shift');
    }
  };

  const handleCancelShift = async (shiftId: string) => {
    try {
      await shiftsApi.cancelShiftBooking(shiftId);
      toast.success('Shift cancelled successfully');
      loadShifts();
    } catch (error) {
      toast.error('Failed to cancel shift');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-GB', {
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Available Shifts</h1>
        <div className="flex items-center space-x-2">
          <span className="badge badge-primary">Available</span>
          <span className="badge badge-success">Booked</span>
          <span className="badge badge-warning">Completed</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shifts.map((shift) => (
          <div
            key={shift.id}
            className="card hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <CalendarDaysIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                    <span>{formatDate(shift.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                    <span>{shift.location}</span>
                  </div>
                </div>
                <span
                  className={`badge ${
                    shift.status === 'available'
                      ? 'badge-primary'
                      : shift.status === 'booked'
                      ? 'badge-success'
                      : 'badge-warning'
                  }`}
                >
                  {shift.status}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-light-border dark:border-dark-border pt-4">
                <div className="flex items-center space-x-2">
                  <CurrencyPoundIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                  <span className="font-medium">{shift.hourlyRate}/hr</span>
                </div>
                <div className="text-sm text-light-text/60 dark:text-dark-text/60">
                  {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                </div>
              </div>

              {shift.status === 'available' ? (
                <button
                  type="button"
                  onClick={() => handleBookShift(shift.id)}
                  className="btn-primary w-full"
                >
                  Book Shift
                </button>
              ) : shift.status === 'booked' ? (
                <button
                  type="button"
                  onClick={() => handleCancelShift(shift.id)}
                  className="btn-secondary w-full"
                >
                  Cancel Booking
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {shifts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No shifts available</h3>
          <p className="mt-2 text-light-text/60 dark:text-dark-text/60">
            Check back later for new opportunities
          </p>
        </div>
      )}
    </div>
  );
}
