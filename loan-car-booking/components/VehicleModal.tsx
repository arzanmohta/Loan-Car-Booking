'use client';

import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

export default function VehicleModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({ make: '', model: '', rego: '', mileage: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/vehicles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setModalIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setModalIsOpen(true)}>Add Vehicle</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Add New Vehicle</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Make" required onChange={(e) => setFormData({ ...formData, make: e.target.value })} />
          <input type="text" placeholder="Model" required onChange={(e) => setFormData({ ...formData, model: e.target.value })} />
          <input type="text" placeholder="Rego" required onChange={(e) => setFormData({ ...formData, rego: e.target.value })} />
          <input type="number" placeholder="Mileage" onChange={(e) => setFormData({ ...formData, mileage: +e.target.value })} />
          <button type="submit">Add Vehicle</button>
        </form>
      </Modal>
    </>
  );
}
