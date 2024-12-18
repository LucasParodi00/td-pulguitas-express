


const path = require('path');

const generateImageUrl = (relativePath) => {
    console.log('Ruta original: ', relativePath);
    
    const baseUrl = process.env.BASE_URL;

    const normalizedPath = relativePath.replace(/\\/g, '/');
    const cleanPath = normalizedPath.replace(/^\/+/, '');
    const fullUrl = `${baseUrl}/${cleanPath}`;
    console.log('Url final: ', fullUrl);
    return fullUrl;
    
};

module.exports = { generateImageUrl }