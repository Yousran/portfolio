import Work from '../../../models/work.js';
import File from '../../../models/file.js';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.query;

        try {
            const existingWork = await Work.findByPk(id);
            if (!existingWork) {
                return res.status(404).json({ error: 'Work not found' });
            }

            const file = await File.findByPk(existingWork.picture);
            if (file) {
                const filePath = path.join(process.cwd(), 'public', file.path);
                const tinyFilePath = path.join(process.cwd(), 'public', file.tiny_path);

                fs.unlinkSync(filePath);
                fs.unlinkSync(tinyFilePath);

                await file.destroy();
            }

            await existingWork.destroy();
            res.status(200).json({ message: 'Work and associated files deleted successfully' });
        } catch (error) {
            console.error('Error deleting work:', error);
            res.status(500).json({ error: 'Failed to delete work' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}