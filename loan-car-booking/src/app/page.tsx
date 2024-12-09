'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Vehicle {
  rego: string;
  make: string;
  model: string;
}

// Using the correct Value type from react-calendar
type CalendarValue = Date | [Date, Date] | null;

export default function HomePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedDate, setSelectedDate] = useState<CalendarValue>(null);

  // Fetch vehicle data from the API
  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch('/api/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data: Vehicle[] = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    }
    fetchVehicles();
  }, []);

  // Handle calendar date changes
  const handleDateChange = (value: CalendarValue) => {
    setSelectedDate(value);
  };

  return (
    <div className="container" style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
      {/* Sidebar for vehicle list */}
      <div className="vehicles-list" style={{ flex: '1', borderRight: '1px solid #ddd', paddingRight: '1rem' }}>
        <h2>Loan Vehicles</h2>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <li key={vehicle.rego} style={{ margin: '1rem 0' }}>
                <strong>{vehicle.make} {vehicle.model}</strong> <br />
                Registration: {vehicle.rego}
              </li>
            ))
          ) : (
            <li>Loading vehicles...</li>
          )}
        </ul>
      </div>

      {/* Main content area for the calendar */}
      <div className="calendar" style={{ flex: '2' }}>
        <h2>Booking Calendar</h2>
        <Calendar
          //onChange={handleDateChange as (value: Date | [Date, Date]) => void} // Explicit cast for proper typing
          value={selectedDate}
        />
        {selectedDate && (
          <p style={{ marginTop: '1rem' }}>
            Selected Date: <strong>
              {Array.isArray(selectedDate)
                ? `${selectedDate[0].toDateString()} - ${selectedDate[1].toDateString()}`
                : selectedDate.toDateString()}
            </strong>
          </p>
        )}
      </div>
    </div>
  );
}
