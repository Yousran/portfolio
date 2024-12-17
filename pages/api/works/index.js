import Work from '../../../models/work.js';
import File from '../../../models/file.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    try {
      const works = await Work.findAll({
        include: [{
          model: File,
          as: 'File'
        }],
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });
      res.status(200).json(works);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch works' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}