const admin = require('firebase-admin');

async function signUp(req, res) {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    return res.status(201).json({
      message: '회원가입 성공',
      user: userRecord,
    });
  } catch (error) {
    return res.status(400).json({ error: '회원가입 실패', details: error });
  }
}

module.exports = signUp;
