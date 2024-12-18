import Experience from '../../../models/experience.js';
import File from '../../../models/file.js';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const experiences = await Experience.findAll({
                include: [{
                    model: File,
                    as: 'File'
                }],
                order: [['createdAt', 'DESC']],
            });
            res.status(200).json(experiences);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch experiences' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}