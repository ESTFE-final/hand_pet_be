const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.firestore();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// API (POST /login)
app.post('/login', async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const user = decodedToken;

    return res.status(200).json({
      message: 'Login successful',
      user: user,
    });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid ID token' });
  }
});

app.get('/', (req, res) => {
  res.send('서버 실행 중');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 http://localhost:${PORT} 에서 실행 중`);
});
