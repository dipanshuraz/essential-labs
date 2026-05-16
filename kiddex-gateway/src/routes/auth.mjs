import { Router } from "express";
import {
  authenticateUser,
  createUser,
  getPublicUserById,
} from "../auth/userStore.mjs";
import { extractBearer, signAccessToken, verifyAccessToken } from "../auth/token.mjs";

export const authRouter = Router();

function authError(res, status, code, message) {
  return res.status(status).json({ error: code, message });
}

function userFromToken(req) {
  const token = extractBearer(req);
  if (!token) return null;
  const payload = verifyAccessToken(token);
  if (!payload?.sub) return null;
  return getPublicUserById(payload.sub);
}

function issueToken(user) {
  const accessToken = signAccessToken({
    sub: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
  });
  return { accessToken, user };
}

authRouter.post("/register", (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body ?? {};

  if (!email || !password || !firstName || !lastName) {
    return authError(res, 400, "validation_error", "Email, password, first name, and last name are required.");
  }
  if (String(password).length < 6) {
    return authError(res, 400, "validation_error", "Password must be at least 6 characters.");
  }

  try {
    const user = createUser({ email, password, firstName, lastName, phone });
    const session = issueToken(user);
    return res.status(201).json(session);
  } catch (err) {
    if (err.code === "EMAIL_TAKEN") {
      return authError(res, 409, "email_taken", "An account with this email already exists.");
    }
    console.error(err);
    return authError(res, 500, "internal_error", "Could not create account.");
  }
});

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return authError(res, 400, "validation_error", "Email and password are required.");
  }

  const user = authenticateUser(email, password);
  if (!user) {
    return authError(res, 401, "invalid_credentials", "Invalid email or password.");
  }

  return res.json(issueToken(user));
});

authRouter.get("/me", (req, res) => {
  const user = userFromToken(req);
  if (!user) return authError(res, 401, "unauthorized", "Sign in required.");
  return res.json({ user });
});

authRouter.post("/logout", (_req, res) => {
  // Stateless JWT — client drops token. Endpoint exists for symmetry / future denylist.
  return res.status(204).send();
});
