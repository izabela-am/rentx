## ASVS L1 Checklist
All of the __required__ controls listed on ASVS L1 are going to be implemented in this application.

### V2. Authentication
#### V2.1 Password Security
- [X] 2.1.1. Verify that user set passwords are at least 12 characters in length (after multiple spaces are combined).

- [X] 2.1.2. Verify that passwords of at least 64 characters are permitted, and that passwords of more than 128 characters are denied.

- [X] 2.1.3. Verify that password truncation is not performed. However, consecutive multiple spaces may be replaced by a single space.

- [X] 2.1.4. Verify that any printable Unicode character, including language neutral characters such as spaces and Emojis are permitted in passwords.

- [X] 2.1.5. Verify users can change their password.

- [X] 2.1.6. Verify that password change functionality requires the user's current and new password.

- [X] 2.1.7. Verify that passwords submitted during account registration, login, and password change are checked against a set of breached passwords.

- [X] 2.1.9. Verify that there are no password composition rules limiting the type of characters permitted. There should be no requirement for upper or lower case or numbers or special characters.

- [X] 2.1.10. Verify that there are no periodic credential rotation or password history requirements.

#### V2.2 General Authenticator Security
- [ ] Verify that anti-automation controls are effective at mitigating breached credential testing, brute force, and account lockout  attacks.

#### V2.5 Credential Recovery
- [X] Verify password hints or knowledge-based authentication (so-called "secret questions") are not present.

- [ ] Verify password credential recovery does not reveal the current password in any way.

- [ ] Verify shared or default accounts are not present (e.g. "root", "admin", or "sa").

- [ ] Verify forgotten password, and other recovery paths use a secure recovery mechanism, such as time-based OTP (TOTP) or other soft token, mobile push, or another offline recovery mechanism.

#### V2.4 Credential Storage
- [X] 2.4.1 Verify that passwords are stored in a form that is resistant to offline attacks. Passwords SHALL be salted and hashed using an approved one-way key derivation or password hashing function. Key derivation and password hashing functions take a password, a salt, and a cost factor as inputs when generating a password hash

- [X] 2.4.2 Verify that the salt is at least 32 bits in length and be chosen arbitrarily to minimize salt value collisions among stored hashes. For each credential, a unique salt value and the resulting hash SHALL be stored.

- [X] Verify that if bcrypt is used, the work factor SHOULD be as large as verification server performance will allow, with a minimum of 10.

#### V3.1 Fundamental Session Management Security
- [ ] Verify the application never reveals session tokens in URL parameters.

#### V3.2 Session Binding
- [X] Verify the application generates a new session token on user authentication.

- [X] Verify that session tokens possess at least 64 bits of entropy. 

#### V3.3 Session Termination
- [ ] Verify that logout and expiration invalidate the session token, such a downstream relying party does not resume an authenticated session, including across relying parties.

- [ ] If authenticators permit users to remain logged in, verify that re-authentication occurs periodically both when actively used or after an idle period. -> L1: 30days

#### V3.5 Token-based Session Management
- [X] Verify that the application enforces access control rules on a trusted service layer, especially if client-side access control is present and could be bypassed

- [ ] Verify that the principle of least privilege exists - users should only be able to access functions, data files, URLs, controllers, services, and other resources, for which they possess specific authorization. This implies protection against spoofing and elevation of privilege