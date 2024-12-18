import Experience from '../../../models/experience.js';
import File from '../../../models/file.js';
import authMiddleware from '../authMiddleware.js';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        authMiddleware(req, res, async () => {
        const { id } = req.query;

        try {
            const existingExperience = await Experience.findByPk(id);
            if (!existingExperience) {
                return res.status(404).json({ error: 'Experience not found' });
            }

            const file = await File.findByPk(existingExperience.picture);
            if (file) {
                const filePath = path.join(process.cwd(), 'public', file.path);
                const tinyFilePath = path.join(process.cwd(), 'public', file.tiny_path);

                fs.unlinkSync(filePath);
                fs.unlinkSync(tinyFilePath);

                await file.destroy();
            }

            await existingExperience.destroy();
            res.status(200).json({ message: 'Experience and associated files deleted successfully' });
        } catch (error) {
            console.error('Error deleting experience:', error);
            res.status(500).json({ error: 'Failed to delete experience' });
        }
    });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}