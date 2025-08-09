// backend/src/routes/setup.route.ts
import { Router } from 'express';
import { decisionsDB } from '../database/db';

const router = Router();

router.get('/', (req, res) => {
  try {
    const rows = decisionsDB.prepare('SELECT * FROM decisions').all();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
