const admin = require('firebase-admin');

async function login(req, res) {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return res.status(200).json({
      message: '로그인 성공',
      user: decodedToken,
    });
  } catch (error) {
    return res.status(401).json({ error: '토큰 invalid' });
  }
}

module.exports = login;
