import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma.js';
import { COOKIE_NAME, cookieOptions, signToken } from '../utils/token.js';

// A real bcrypt hash of a random string, used so that login takes the same
// time whether or not the email exists (prevents "user enumeration" by timing).
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 12);

// POST /api/auth/signup
export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(409).json({ message: 'Validation failed', fields: { email: 'This email is already registered' } });
    }
    // Never store the password itself: only a salted bcrypt hash (cost 12)
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true },
    });
    res.cookie(COOKIE_NAME, signToken(user.id), cookieOptions());
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    const ok = await bcrypt.compare(password, user ? user.passwordHash : DUMMY_HASH);
    if (!user || !ok) {
      // Same message for "unknown email" and "wrong password"
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    res.cookie(COOKIE_NAME, signToken(user.id), cookieOptions());
    res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/logout
export function logout(req, res) {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions(), maxAge: undefined });
  res.json({ message: 'Logged out' });
}

// GET /api/auth/me  (requires login)
export function me(req, res) {
  res.json({ user: req.user });
}
