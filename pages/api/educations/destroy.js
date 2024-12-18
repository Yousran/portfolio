import Education from '../../../models/education.js';
import File from '../../../models/file.js';
import authMiddleware from '../authMiddleware.js';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        authMiddleware(req, res, async () => {
        const { id } = req.query;

        try {
            const existingEducation = await Education.findByPk(id);
            if (!existingEducation) {
                return res.status(404).json({ error: 'Education not found' });
            }

            const file = await File.findByPk(existingEducation.picture);
            if (file) {
                const filePath = path.join(process.cwd(), 'public', file.path);
                const tinyFilePath = path.join(process.cwd(), 'public', file.tiny_path);

                fs.unlinkSync(filePath);
                fs.unlinkSync(tinyFilePath);

                await file.destroy();
            }

            await existingEducation.destroy();
            res.status(200).json({ message: 'Education and associated files deleted successfully' });
        } catch (error) {
            console.error('Error deleting education:', error);
            res.status(500).json({ error: 'Failed to delete education' });
        }
    });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}