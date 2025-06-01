import multer from 'multer';
import { v4 } from 'uuid';

export const FileUpload = (
    location: string,
    options?: {
        maxFileSize?: number;
        maxFiles?: number;
        allowedMimeTypes?: string[];
    },
) => {
    const {
        maxFileSize = 5,
        maxFiles = 5,
        allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/jpg',
        ],
    } = options || {};

    const storage = multer.diskStorage({
        destination(req, file, callback) {
            callback(null, location);
        },
        filename(req, file, callback) {
            const uniquePrefix = `${Date.now()}-${v4()}`;
            callback(null, `${uniquePrefix}-${file.originalname}`);
        },
    });

    const fileFilter = (
        req: Express.Request,
        file: Express.Multer.File,
        callback: multer.FileFilterCallback,
    ) => {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return callback(
                new Error(`Unsupported file type: ${file.mimetype}`),
            );
        }
        callback(null, true);
    };

    return multer({
        storage,
        limits: {
            fileSize: maxFileSize * 1024 * 1024,
            files: maxFiles,
        },
        fileFilter,
    });
};
