import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import File from '../../models/file.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  }
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    const { originalname, filename } = req.file;
    const filePath = path.join('uploads', filename);
    const tinyFilePath = path.join('uploads', `tiny-${filename}`);

    await sharp(path.join(process.cwd(), 'public', filePath))
      .resize(50)
      .toFile(path.join(process.cwd(), 'public', tinyFilePath));

    try {
      const newFile = await File.create({
        path: filePath,
        tiny_path: tinyFilePath,
        original_name: originalname,
      });

      res.status(201).json(newFile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save file data' });
    }
  });
};

export default handler;