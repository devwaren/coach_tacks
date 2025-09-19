// utils/aes.ts
import crypto from "crypto";

const AES_SECRET = process.env.AES_SECRET || "default_super_secret_32_chars!!";
const AES_KEY = crypto.createHash("sha256").update(AES_SECRET).digest(); // 32 bytes

export function encryptAESGCM(plaintext: string): string {
    const iv = crypto.randomBytes(12); // GCM IV = 12 bytes
    const cipher = crypto.createCipheriv("aes-256-gcm", AES_KEY, iv);

    const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
    const authTag = cipher.getAuthTag();

    return Buffer.concat([iv, authTag, encrypted]).toString("base64");
}

export function decryptAESGCM(ciphertextB64: string): string {
    const buf = Buffer.from(ciphertextB64, "base64");
    const iv = buf.subarray(0, 12);
    const authTag = buf.subarray(12, 28);
    const encrypted = buf.subarray(28);

    const decipher = crypto.createDecipheriv("aes-256-gcm", AES_KEY, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString("utf8");
}
