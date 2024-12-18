import Experience from '../../../models/experience.js';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { id } = req.query;
        const { date, title, description, picture, link } = req.body;

        try {
            const existingExperience = await Experience.findByPk(id);
            if (!existingExperience) {
                return res.status(404).json({ error: 'Experience not found' });
            }

            const updatedExperience = await existingExperience.update({
                date,
                title,
                description,
                picture: picture || existingExperience.picture,
                link
            });

            res.status(200).json(updatedExperience);
        } catch (error) {
            console.error('Error updating experience:', error);
            res.status(500).json({ error: 'Failed to update experience' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}