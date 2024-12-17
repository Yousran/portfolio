import Work from '../../../models/work.js';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { title, description, picture, link } = req.body;

    try {
      const existingWork = await Work.findByPk(id); // Use findByPk instead of findById
      if (!existingWork) {
        return res.status(404).json({ error: 'Work not found' });
      }

      const updatedWork = await existingWork.update({
        title,
        description,
        picture: picture || existingWork.picture,
        link
      });

      res.status(200).json(updatedWork);
    } catch (error) {
      console.error('Error updating work:', error); // Log the actual error
      res.status(500).json({ error: 'Failed to update work' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}