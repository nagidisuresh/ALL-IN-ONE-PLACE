import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const DB_PATH = path.join(process.cwd(), "users.json");
const JWT_SECRET = process.env.JWT_SECRET || "nextroundprep_super_secret_key_1337";

// Interface for User record
export interface UserRecord {
  id: string;
  email: string;
  name: string;
  passwordHash?: string;
  provider: "local" | "google" | "github";
  providerId?: string;
  createdAt: string;
}

// Memory database
let users: UserRecord[] = [];

// Load users from JSON database
function loadUsers() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, "utf-8");
      users = JSON.parse(data);
    } else {
      users = [];
      saveUsers();
    }
  } catch (error) {
    console.error("Failed to load users:", error);
    users = [];
  }
}

// Save users to JSON database
function saveUsers() {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save users:", error);
  }
}

// Initialize database
loadUsers();

// Helper to construct dynamic OAuth redirect URI
export function getRedirectUri(hostHeader: string, provider: "google" | "github"): string {
  // Try to determine the protocol (usually https behind Cloud Run proxies, http for localhost)
  const isLocalhost = hostHeader.includes("localhost") || hostHeader.includes("127.0.0.1") || hostHeader.includes("0.0.0.0");
  const protocol = isLocalhost ? "http" : "https";
  
  // Clean trailing slashes or ports if any
  return `${protocol}://${hostHeader}/api/auth/${provider}/callback`;
}

// User registration
export async function registerUser(email: string, name: string, password?: string): Promise<UserRecord> {
  const normalizedEmail = email.toLowerCase().trim();
  
  // Check if user already exists
  const existing = users.find((u) => u.email === normalizedEmail);
  if (existing) {
    throw new Error("User with this email already exists");
  }

  let passwordHash: string | undefined;
  if (password) {
    passwordHash = await bcrypt.hash(password, 10);
  }

  const newUser: UserRecord = {
    id: Math.random().toString(36).substring(2, 11),
    email: normalizedEmail,
    name: name.trim(),
    passwordHash,
    provider: "local",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers();
  return newUser;
}

// User login via email/password
export async function authenticateUser(email: string, password?: string): Promise<UserRecord> {
  const normalizedEmail = email.toLowerCase().trim();
  const user = users.find((u) => u.email === normalizedEmail);
  
  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (user.provider !== "local") {
    throw new Error(`This email is registered via ${user.provider}. Please log in using that method.`);
  }

  if (!user.passwordHash || !password) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
}

// Google or GitHub OAuth Sign-In or Sign-Up (Upsert user)
export function upsertOAuthUser(email: string, name: string, provider: "google" | "github", providerId: string): UserRecord {
  const normalizedEmail = email.toLowerCase().trim();
  let user = users.find((u) => u.email === normalizedEmail);

  if (user) {
    // If user exists, update their provider info if they previously logged in differently
    user.name = name;
    user.provider = provider;
    user.providerId = providerId;
    saveUsers();
  } else {
    // Create new OAuth user
    user = {
      id: Math.random().toString(36).substring(2, 11),
      email: normalizedEmail,
      name: name,
      provider,
      providerId,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveUsers();
  }

  return user;
}

// Generate JWT token
export function generateToken(user: UserRecord): string {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, provider: user.provider },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
