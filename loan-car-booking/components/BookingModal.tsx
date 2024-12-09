'use client';

import React, { useState } from 'react';
import Modal from 'react-modal';

// Define types for props
interface Vehicle {
  _id: string;
  make: string;
  model: string;
}

interface BookingModalProps {
  selectedDate: Date;
  vehicles: Vehicle[];
}

Modal.setAppElement('#__next');

export default function BookingModal({ selectedDate, vehicles }: BookingModalProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    vehicleId: '',
    user: '',
    startDate: selectedDate,
    endDate: selectedDate,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setModalIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setModalIsOpen(true)}>Book Vehicle</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Book Vehicle</h2>
        <form onSubmit={handleSubmit}>
          <select
            onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
          >
            <option value="">Select Vehicle</option>
            {vehicles.map((vehicle: Vehicle) => (
              <option key={vehicle._id} value={vehicle._id}>
                {vehicle.make} {vehicle.model}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="User"
            required
            onChange={(e) => setFormData({ ...formData, user: e.target.value })}
          />
          <input
            type="date"
            value={formData.startDate.toISOString().split('T')[0]}
            onChange={(e) =>
              setFormData({ ...formData, startDate: new Date(e.target.value) })
            }
          />
          <input
            type="date"
            value={formData.endDate.toISOString().split('T')[0]}
            onChange={(e) =>
              setFormData({ ...formData, endDate: new Date(e.target.value) })
            }
          />
          <button type="submit">Book</button>
        </form>
      </Modal>
    </>
  );
}
