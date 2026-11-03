# Security Specification: Fortress Rules & Threat Model

## 1. Data Invariants

1. **Identity & Ownership Invariant**:
   - Every survey submission must be tied to an authenticated session ID or legitimate client identifier (`userId`).
   - A user cannot forge or overwrite another user's submitted scores or survey feedback.
   - PII and user profile documents (`/users/{userId}`) can only be viewed or modified by the authenticated owner (`request.auth.uid == userId`).

2. **Integrity & Bounds Invariant**:
   - `score` must be a non-negative integer between `0` and `1,000,000`.
   - `accuracy` must be a percentage between `0` and `100`.
   - `correctCount` and `totalQuestions` must be within reasonable scenario bounds (`0` to `50`).
   - Text inputs (`playerName`, `persona`, `feedback`) must have explicit `.size()` upper limits to prevent Denial-of-Wallet (storage exhaustion) attacks.
   - Scenario decisions must be bounded in list length (`size() <= 50`).

3. **Terminal State & Action Invariant**:
   - Once a survey score is created, its core metrics (`score`, `accuracy`, `categoryBreakdown`, `decisions`, `createdAt`) are immutable.
   - Updates are restricted to attaching post-quiz user reflection (`feedback`, `rating`, `feedbackSubmittedAt`) and nothing else (`affectedKeys().hasOnly(['feedback', 'rating', 'feedbackSubmittedAt'])`).

4. **Default-Deny Catch-All**:
   - Any collection or document path not explicitly allowed must be completely inaccessible (`match /{document=**} { allow read, write: if false; }`).

---

## 2. The Dirty Dozen Payloads (Threat Vectors Blocked)

1. **Privilege Escalation on User Profile**: Attempting to read or write `/users/victim_user_123` when authenticated as `attacker_user_456`.
2. **Denial-of-Wallet 2MB Junk Payload**: Attempting to insert a 2MB string into `feedback` or `playerName`.
3. **Score Forgery / Negative Score Injection**: Submitting `score: -99999` or `score: 9999999999`.
4. **Accuracy Tampering**: Submitting `accuracy: 500%` or `accuracy: -10%`.
5. **Shadow Field Injection**: Injecting unexpected admin keys such as `isAdmin: true` or `verifiedBypass: true` into `survey_results`.
6. **Path Traversal / Malicious ID Injection**: Creating a document with ID `../../secrets/token` or non-alphanumeric junk characters.
7. **Score Overwrite (Post-Quiz Tampering)**: Sending an `update` operation that modifies `score: 1000` after a completed quiz.
8. **Decisions Array Flooding**: Submitting an array of 5,000 decision objects to exhaust document quotas.
9. **Fake Game Mode Injection**: Submitting `gameMode: "unrestricted_exploit"`.
10. **Rating Boundary Violation**: Submitting `rating: 100` or `rating: 0`.
11. **Blanket Collection Leakage**: Querying arbitrary system collections outside `/survey_results` and `/users`.
12. **Anonymous Impersonation**: Attempting to delete a community survey result authored by a different user.
