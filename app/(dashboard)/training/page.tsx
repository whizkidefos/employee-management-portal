'use client';

import { useState, useEffect } from 'react';
import {
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyPoundIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { trainingApi } from '@/app/lib/api';
import type { Course } from '@/app/lib/api';

export default function TrainingPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setIsLoading(true);
      const data = await trainingApi.getAllCourses();
      setCourses(data);
    } catch (error) {
      toast.error('Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnroll = async (courseId: string) => {
    try {
      await trainingApi.enrollInCourse(courseId);
      toast.success('Successfully enrolled in course');
      loadCourses();
    } catch (error) {
      toast.error('Failed to enroll in course');
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      await trainingApi.unenrollFromCourse(courseId);
      toast.success('Successfully unenrolled from course');
      loadCourses();
    } catch (error) {
      toast.error('Failed to unenroll from course');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
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
        <h1 className="text-2xl font-semibold">Training Courses</h1>
        <div className="flex items-center space-x-2">
          <span className="badge badge-primary">Upcoming</span>
          <span className="badge badge-success">Ongoing</span>
          <span className="badge badge-warning">Completed</span>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="card hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="mt-1 text-sm text-light-text/60 dark:text-dark-text/60">
                    {course.description}
                  </p>
                </div>
                <span
                  className={`badge ${
                    course.status === 'upcoming'
                      ? 'badge-primary'
                      : course.status === 'ongoing'
                      ? 'badge-success'
                      : 'badge-warning'
                  }`}
                >
                  {course.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                  <span className="text-sm">
                    {formatDate(course.startDate)} - {formatDate(course.endDate)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <UserGroupIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                  <span className="text-sm">
                    {course.enrolled}/{course.capacity} enrolled
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-light-border dark:border-dark-border pt-4">
                <div className="flex items-center space-x-2">
                  <AcademicCapIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                  <span className="text-sm">{course.instructor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CurrencyPoundIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                  <span className="font-medium">{course.price}</span>
                </div>
              </div>

              {course.status === 'upcoming' && course.enrolled < course.capacity ? (
                <button
                  type="button"
                  onClick={() => handleEnroll(course.id)}
                  className="btn-primary w-full"
                >
                  Enroll Now
                </button>
              ) : course.status === 'upcoming' ? (
                <button
                  type="button"
                  onClick={() => handleUnenroll(course.id)}
                  className="btn-secondary w-full"
                >
                  Cancel Enrollment
                </button>
              ) : null}

              {course.enrolled >= course.capacity && (
                <p className="text-center text-sm text-red-600">
                  This course is currently full
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No courses available</h3>
          <p className="mt-2 text-light-text/60 dark:text-dark-text/60">
            Check back later for new training opportunities
          </p>
        </div>
      )}
    </div>
  );
}
