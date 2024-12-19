import fs from "fs";
import path from "path";
import mime from "mime";

export default function handler(req, res) {
    const imagePath = req.query.slug.join("/");
    const filePath = path.resolve(".", `public/uploads/${imagePath}`);
    const imageBuffer = fs.readFileSync(filePath);
    const mimeType = mime.getType(filePath);

    res.setHeader("Content-Type", mimeType);
    return res.send(imageBuffer);
}