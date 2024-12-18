import Education from '../../../models/education.js';
import File from '../../../models/file.js';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const educations = await Education.findAll({
                include: [{
                    model: File,
                    as: 'File'
                }],
                order: [['date', 'DESC']],
            });
            res.status(200).json(educations);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch educations' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}