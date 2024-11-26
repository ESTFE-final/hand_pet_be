const admin = require('firebase-admin');

async function socialLogin(req, res) {
  const { token } = req.body;

  try {
    const credential = admin.auth.GoogleAuthProvider.credential(token);
    const user = await admin.auth().signInWithCredential(credential);

    return res.status(200).json({
      message: '소셜 로그인 성공',
      user: user,
    });
  } catch (error) {
    return res.status(401).json({ error: '소셜 로그인 토큰 invalid' });
  }
}

module.exports = socialLogin;
