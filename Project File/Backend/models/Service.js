import mongoose from 'mongoose';

const CoordinatesSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
}, { _id: false });

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['repair', 'towing', 'toll', 'gas', 'parts'], required: true },
  distance: { type: Number, default: 0 }, // optional precomputed value
  rating: { type: Number, default: 4 },
  status: { type: String, enum: ['open', 'busy', 'closed'], default: 'open' },
  phone: String,
  address: String,
  coordinates: { type: CoordinatesSchema, required: true },
  services: [String],
  hours: String,
  description: String,
  website: String,
  email: String,
  specialties: [String],
  certifications: [String],
  priceRange: String,
  image: String
}, { timestamps: true });

export default mongoose.model('Service', ServiceSchema);
