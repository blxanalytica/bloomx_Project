import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { contactHandler } from './routes/contact.js';
import { careerHandler } from './routes/career.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Configure multer for file uploads (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
  },
});

// Routes
// Contact form - no files, but use multer for multipart/form-data parsing
app.post('/api/forms/contact', upload.none(), contactHandler);
// Career form - with file uploads
app.post('/api/forms/career', upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'attachments', maxCount: 10 },
]), careerHandler);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

