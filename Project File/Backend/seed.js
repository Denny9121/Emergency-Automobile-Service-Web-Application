import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Service from './models/Service.js';

dotenv.config();

const data = [
  {
    name: "Mike's Auto Repair",
    type: "repair",
    rating: 4.8,
    status: "open",
    phone: "(555) 123-4567",
    address: "123 Main St, Downtown",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    services: ["Engine Repair", "Brake Service", "Oil Change", "Transmission"],
    hours: "24/7 Emergency Service",
    description: "Full-service auto repair with certified mechanics and 30+ years experience",
    website: "www.mikesautorepair.com",
    email: "info@mikesautorepair.com",
    specialties: ["European Cars", "Hybrid Vehicles", "Diesel Engines"],
    certifications: ["ASE Certified", "AAA Approved"],
    priceRange: "$$",
    image: "https://placehold.co/300x200"
  },
  {
    name: "QuickTow Emergency",
    type: "towing",
    rating: 4.9,
    status: "open",
    phone: "(555) 987-6543",
    address: "456 Highway Blvd",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    services: ["24/7 Towing", "Jump Start", "Lockout Service", "Tire Change"],
    hours: "24/7",
    description: "Fast and reliable towing service with GPS tracking and ETA updates",
    website: "www.quicktow.com",
    email: "dispatch@quicktow.com",
    specialties: ["Heavy Duty Towing", "Motorcycle Towing", "Exotic Cars"],
    certifications: ["Licensed & Insured", "BBB A+"],
    priceRange: "$$$",
    image: "https://placehold.co/300x200"
  },
  {
    name: "Shell Gas Station",
    type: "gas",
    rating: 4.5,
    status: "open",
    phone: "(555) 444-5555",
    address: "321 Oak Avenue",
    coordinates: { lat: 40.7505, lng: -73.9934 },
    services: ["Fuel", "Convenience Store", "Car Wash", "ATM"],
    hours: "24/7",
    description: "Full-service gas station with amenities and competitive fuel prices",
    website: "www.shell.com",
    email: "manager@shell321oak.com",
    specialties: ["Premium Fuel", "Diesel", "Electric Charging"],
    certifications: ["Top Tier Gasoline"],
    priceRange: "$$",
    image: "https://placehold.co/300x200"
  },
  {
    name: "AutoZone Parts Store",
    type: "parts",
    rating: 4.4,
    status: "open",
    phone: "(555) 333-4444",
    address: "147 Commerce St",
    coordinates: { lat: 40.7614, lng: -73.9776 },
    services: ["Auto Parts", "Tool Rental", "Battery Testing", "Installation Help"],
    hours: "Mon-Sat 7AM-10PM, Sun 9AM-9PM",
    description: "Complete auto parts store with expert advice and installation assistance",
    website: "www.autozone.com",
    email: "store147@autozone.com",
    specialties: ["Performance Parts", "OEM Replacement", "Battery & Electrical"],
    certifications: ["ASE Parts Specialist"],
    priceRange: "$$",
    image: "https://placehold.co/300x200"
  }
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Service.deleteMany({});
    await Service.insertMany(data);
    console.log('Seeded sample services.');
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();
