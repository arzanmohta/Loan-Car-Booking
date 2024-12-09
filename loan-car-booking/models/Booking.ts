import mongoose, { Schema, model, models } from 'mongoose';

const bookingSchema = new Schema({
  vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  user: { type: String, required: true },
});

const Booking = models.Booking || model('Booking', bookingSchema);

export default Booking;
