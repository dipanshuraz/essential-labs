import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { hashPassword, verifyPassword } from "./password.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.resolve(__dirname, "../../data/customers.json");

/** @type {Map<string, { id: string, email: string, passwordHash: string, firstName: string, lastName: string, phone: string, createdAt: string }>} */
const usersByEmail = new Map();

function toPublicUser(user) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    createdAt: user.createdAt,
  };
}

function persist() {
  const dir = path.dirname(DATA_FILE);
  fs.mkdirSync(dir, { recursive: true });
  const list = [...usersByEmail.values()];
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), "utf8");
}

function load() {
  try {
    if (!fs.existsSync(DATA_FILE)) return;
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return;
    for (const u of list) {
      if (u?.email && u?.passwordHash) usersByEmail.set(u.email.toLowerCase(), u);
    }
  } catch (err) {
    console.warn("[kiddex-gateway] Could not load customers.json:", err.message);
  }
}

function seedDemoUser() {
  const email = "shopper@kiddex.com";
  if (usersByEmail.has(email)) return;
  usersByEmail.set(email, {
    id: randomUUID(),
    email,
    passwordHash: hashPassword("shop123"),
    firstName: "Deepanshu",
    lastName: "Prajapati",
    phone: "+91 98765 43210",
    createdAt: new Date().toISOString(),
  });
  persist();
}

load();
seedDemoUser();

export function findUserByEmail(email) {
  return usersByEmail.get(email.trim().toLowerCase()) ?? null;
}

export function findUserById(id) {
  for (const user of usersByEmail.values()) {
    if (user.id === id) return user;
  }
  return null;
}

export function createUser({ email, password, firstName, lastName, phone }) {
  const normalized = email.trim().toLowerCase();
  if (usersByEmail.has(normalized)) {
    const err = new Error("email_taken");
    err.code = "EMAIL_TAKEN";
    throw err;
  }
  const user = {
    id: randomUUID(),
    email: normalized,
    passwordHash: hashPassword(password),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    phone: (phone ?? "").trim(),
    createdAt: new Date().toISOString(),
  };
  usersByEmail.set(normalized, user);
  persist();
  return toPublicUser(user);
}

export function authenticateUser(email, password) {
  const user = findUserByEmail(email);
  if (!user || !verifyPassword(password, user.passwordHash)) return null;
  return toPublicUser(user);
}

export function getPublicUser(email) {
  const user = findUserByEmail(email);
  return user ? toPublicUser(user) : null;
}

export function getPublicUserById(id) {
  const user = findUserById(id);
  return user ? toPublicUser(user) : null;
}
