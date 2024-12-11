const sharp = require('sharp');
const path = require('path');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

const convertImageMiddleware = async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
        return next();
    }

    const uploadDir = path.join(process.cwd(), 'public', 'images');
    
    try {
        // Asegurarse de que el directorio exista
        await fs.mkdir(uploadDir, { recursive: true });

        // Convertir imágenes en memoria
        const convertedFiles = await Promise.all(
            req.files.map(async (file) => {
                const uniqueId = uuidv4();
                const outputFilename = `${uniqueId}.webp`;
                const outputPath = path.join(uploadDir, outputFilename);

                // Convertir imagen desde el buffer en memoria
                await sharp(file.buffer)
                    .webp({ 
                        quality: 80,  
                        lossless: false,
                        nearLossless: false
                    }) 
                    .resize({ 
                        width: 1024,  
                        height: 1024, 
                        fit: 'inside' 
                    })
                    .toFile(outputPath);

                    const relativePatch = path.join('public/images', outputFilename);
                // Retornar información del archivo convertido
                return {
                    originalname: file.originalname,
                    filename: outputFilename,
                    path: relativePatch,
                    mimetype: 'image/webp'
                };
            })
        );

        // Reemplazar los archivos originales con los convertidos
        req.files = convertedFiles;
        next();
    } catch (error) {
        // Limpiar archivos en caso de error
        if (req.files) {
            await Promise.all(
                req.files.map(file => 
                    fs.unlink(file.path).catch(() => {})
                )
            );
        }

        res.status(500).json({
            mensaje: 'Error procesando imágenes',
            error: error.message
        });
    }
};

module.exports = { convertImageMiddleware };