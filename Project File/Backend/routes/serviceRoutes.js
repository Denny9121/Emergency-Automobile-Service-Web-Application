import express from 'express';
import Service from '../models/Service.js';

const router = express.Router();

// Haversine distance in km
const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = (x) => x * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// GET /api/services
// Optional query params: lat, lng, radius(km), type
router.get('/', async (req, res) => {
  try {
    const { lat, lng, radius = 40, type } = req.query;

    let query = {};
    if (type && type !== 'all') query.type = type;

    const all = await Service.find(query).lean();

    if (lat && lng) {
      const clat = parseFloat(lat);
      const clng = parseFloat(lng);
      const r = parseFloat(radius);
      const filtered = all
        .map(s => ({
          ...s,
          distanceKm: haversine(clat, clng, s.coordinates.lat, s.coordinates.lng)
        }))
        .filter(s => s.distanceKm <= r)
        .sort((a, b) => a.distanceKm - b.distanceKm);

      return res.json(filtered);
    }

    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/services/search?q=term
router.get('/search', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json([]);
    const regex = new RegExp(q, 'i');
    const results = await Service.find({
      $or: [
        { name: regex },
        { address: regex },
        { services: regex },
        { specialties: regex }
      ]
    }).lean();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/services/:id
router.get('/:id', async (req, res) => {
  try {
    const svc = await Service.findById(req.params.id).lean();
    if (!svc) return res.status(404).json({ error: 'Not found' });
    res.json(svc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
