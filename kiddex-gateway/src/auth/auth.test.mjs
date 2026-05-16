import { describe, it } from "node:test";
import assert from "node:assert";
import { hashPassword, verifyPassword } from "./password.mjs";
import { signAccessToken, verifyAccessToken } from "./token.mjs";

describe("password", () => {
  it("hashes and verifies", () => {
    const stored = hashPassword("shop123");
    assert.ok(verifyPassword("shop123", stored));
    assert.equal(verifyPassword("wrong", stored), false);
  });
});

describe("token", () => {
  it("signs and verifies payload", () => {
    const token = signAccessToken({ sub: "user-1", email: "a@b.com" }, 60);
    const payload = verifyAccessToken(token);
    assert.equal(payload.sub, "user-1");
    assert.equal(payload.email, "a@b.com");
  });
});
