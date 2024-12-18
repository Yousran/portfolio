import Experience from '../../../models/experience.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { date, title, description, picture = null, link = null } = req.body;

        try {
            const newExperience = await Experience.create({ date, title, description, picture, link });
            res.status(201).json(newExperience);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to create experience' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}