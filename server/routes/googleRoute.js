import { google } from 'googleapis';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import express from 'express';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const credentialsPath = join(__dirname, '../data/client_secret.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath));

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/documents'],
});

const docs = google.docs({ version: 'v1', auth });

router.get('/create-doc', async (req, res) => {
  try {
    const document = await docs.documents.create({
      requestBody: {
        title: 'Project Report',
      },
    });
    res.json(document.data);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ error: 'Failed to create document' });
  }
});

export default router;