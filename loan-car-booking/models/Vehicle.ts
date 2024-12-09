import mongoose, { Schema, model, models } from 'mongoose';

const vehicleSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  rego: { type: String, required: true, unique: true },
  mileage: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
});

const Vehicle = models.Vehicle || model('Vehicle', vehicleSchema);

export default Vehicle;
