const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const admin = require('firebase-admin');
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

const signUp = require('./auth/signUp');
const login = require('./auth/login');
const socialLogin = require('./auth/socialLogin');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.post('/signup', signUp);
app.post('/login', login);
app.post('/social-login', socialLogin);

app.get('/', (req, res) => {
  res.send('서버 실행 중');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 http://localhost:${PORT} 에서 실행 중`);
});
