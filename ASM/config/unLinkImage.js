import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'fs';
export function unLinkImage(urlImage) {
    const imagePath = path.join(__dirname, "../../public/", urlImage);
    fs.unlink(imagePath, (err) => {
    if (err) {
        console.error('Lỗi khi xóa tệp tin ảnh:', err);
    } else {
        console.log('Tệp tin ảnh đã được xóa thành công');
    }
    });
}