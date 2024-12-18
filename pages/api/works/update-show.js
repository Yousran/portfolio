import Work from '../../../models/work.js';
import authMiddleware from '../authMiddleware.js';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    authMiddleware(req, res, async () => {
    const { id } = req.query;
    const { show } = req.body;

    try {
      const existingWork = await Work.findByPk(id);
      if (!existingWork) {
        return res.status(404).json({ error: 'Work not found' });
      }

      const updatedWork = await existingWork.update({ show });

      res.status(200).json(updatedWork);
    } catch (error) {
      console.error('Error updating show status:', error);
      res.status(500).json({ error: 'Failed to update show status' });
    }
  });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}