import jwt from 'jsonwebtoken';

const users = [];

const signup = (req, res) => {
  users.push(req.body);
  res.json({ success: true });
};

const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!!user && user.password === password) {
    const token = jwt.sign(
      { username: user.username, name: user.name },
      process.env.SECRET_KEY
    );
    res.json({ token });
  } else {
    res.status(401).json({ error: { message: "Login failed" } });
  }
};

const profile = (req, res) => {
  res.json(req.payload);
};

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authorization.slice("Bearer ".length);

  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Token verification failed" });
    } else {
      req.payload = payload;
      next();
    }
  });
};

export { signup, login, profile, verifyToken }