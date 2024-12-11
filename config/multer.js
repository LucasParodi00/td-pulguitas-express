const multer = require('multer');
const path = require('path');
const {v4: uuidv4} = require('uuid');

// Usamos memoria en lugar de disco
const storage = multer.memoryStorage();

const createMulterUpload = (options = {}) => {
    const defaultOptions = {
        storage: storage,
        fileFilter: (req, file, cb) => {
            const allowedTypes = [
                'image/jpeg', 
                'image/png', 
                'image/gif', 
                'image/webp'
            ];
            if (allowedTypes.includes(file.mimetype)) {
                cb(null, true);
            } else { 
                cb(new Error('Archivo no válido!'), false);
            }
        },
        limits: {
            fileSize: 5 * 1024 * 1024, // 5MB
            files: 10
        }
    };

    return multer({...defaultOptions, ...options});
}

module.exports = { createMulterUpload };