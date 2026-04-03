const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.mmd': 'text/plain',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return MIME_TYPES[ext] || 'application/octet-stream';
}

function findMmdFiles(dir, baseDir = dir) {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...findMmdFiles(fullPath, baseDir));
        } else if (entry.isFile() && entry.name.endsWith('.mmd')) {
            const relativePath = path.relative(baseDir, fullPath);
            files.push({
                name: entry.name.replace('.mmd', ''),
                path: relativePath.replace(/\\/g, '/')
            });
        }
    }
    return files;
}

function handleApi(req, res) {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    
    if (url.pathname === '/api/diagrams' && req.method === 'GET') {
        const diagrams = findMmdFiles(ROOT_DIR);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(diagrams));
        return;
    }
    
    if (url.pathname === '/api/diagram' && req.method === 'GET') {
        const filePath = url.searchParams.get('path');
        if (!filePath) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing path parameter' }));
            return;
        }
        
        const fullPath = path.join(ROOT_DIR, filePath);
        if (!fullPath.startsWith(ROOT_DIR)) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Access denied' }));
            return;
        }
        
        if (!fs.existsSync(fullPath)) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'File not found' }));
            return;
        }
        
        const content = fs.readFileSync(fullPath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(content);
        return;
    }
    
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'API not found' }));
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    
    if (url.pathname.startsWith('/api/')) {
        handleApi(req, res);
        return;
    }
    
    let filePath = url.pathname === '/' ? '/index.html' : url.pathname;
    const fullPath = path.join(ROOT_DIR, filePath);
    
    if (!fullPath.startsWith(ROOT_DIR)) {
        res.writeHead(403);
        res.end('Access denied');
        return;
    }
    
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
        res.writeHead(404);
        res.end('File not found');
        return;
    }
    
    const mimeType = getMimeType(fullPath);
    const content = fs.readFileSync(fullPath);
    
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(content);
});

server.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${ROOT_DIR}`);
    console.log(`\nAPI Endpoints:`);
    console.log(`  GET /api/diagrams  - List all .mmd files`);
    console.log(`  GET /api/diagram?path=<file> - Get file content`);
    console.log(`\nPress Ctrl+C to stop\n`);
});
