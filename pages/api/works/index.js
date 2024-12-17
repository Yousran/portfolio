import Work from '../../../models/work.js';
import File from '../../../models/file.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const works = await Work.findAll({
        include: [{
          model: File,
          as: 'File'
        }]
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