import Education from '../../../models/education.js';
import authMiddleware from '../authMiddleware.js';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        authMiddleware(req, res, async () => {
        const { id } = req.query;
        const { show } = req.body;
        
        try {
            const existingEducation = await Education.findByPk(id);
            if (!existingEducation) {
                return res.status(404).json({ error: 'Education not found' });
            }

            const updatedEducation = await existingEducation.update({ show });

            res.status(200).json(updatedEducation);
        } catch (error) {
            console.error('Error updating show status:', error);
            res.status(500).json({ error: 'Failed to update show status' });
        }
    });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}