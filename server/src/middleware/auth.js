import { prisma } from '../config/prisma.js';
import { COOKIE_NAME, verifyToken } from '../utils/token.js';

// Protects private routes: reads the JWT from the HttpOnly cookie,
// checks the signature, then loads the user from the database.
export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return res.status(401).json({ message: 'Not logged in' });
    const payload = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, name: true, email: true },
    });
    if (!user) return res.status(401).json({ message: 'Account no longer exists' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Session expired, please log in again' });
  }
}
