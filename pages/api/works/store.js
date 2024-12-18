import Work from '../../../models/work.js';
import authMiddleware from '../authMiddleware.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    authMiddleware(req, res, async () => {
    const { title, description, picture, link } = req.body;

    try {
      const newWork = await Work.create({ title, description, picture, link });
      res.status(201).json(newWork);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create work' });
    }
  });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}