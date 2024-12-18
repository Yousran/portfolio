import Education from '../../../models/education.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { date, title, description, picture = null, link = null } = req.body;

        try {
            const newEducation = await Education.create({ date, title, description, picture, link });
            res.status(201).json(newEducation);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to create education' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}