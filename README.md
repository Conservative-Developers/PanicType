# PanicType — Technical System Design

PanicType is a real-time typing race platform inspired by Monkeytype, designed for low-latency gameplay, persistent user profiles, and competitive ranking systems.

---

## 1. Objectives

### 1.1 Product Goals
- Deliver fast, responsive typing races with deterministic scoring.
- Provide long-term progression through user profiles and historical performance analytics.
- Support trustworthy, competitive ranking through leaderboards and anti-cheat controls.

### 1.2 Non-Goals (Initial Phase)
- Real-money tournaments.
- Offline-first native clients.
- Full social graph (friends/chat) in v1.

---

## 2. Functional Requirements

### 2.1 Typing Race Core
- Serve race prompts with configurable language/difficulty/length.
- Capture per-keystroke or chunked typing events.
- Compute final metrics:
  - WPM
  - CPM
  - Accuracy (%)
  - Time to completion
  - Error count
- Support solo mode first; multiplayer race orchestration can be added later.

### 2.2 User Profiles
- Authentication and account lifecycle (signup/login/session refresh).
- User profile with:
  - Public identity (username, avatar)
  - Personal bests
  - Aggregate statistics (daily, weekly, all-time)
  - Race history

### 2.3 Ranking / Leaderboards
- Daily, weekly, monthly, all-time leaderboard views.
- Ranking based on weighted score from speed and accuracy.
- Tie-breaking rules (e.g., accuracy, completion time, attempt count).

### 2.4 Admin / Moderation (Minimum)
- Flag suspicious race submissions.
- Manual reset or invalidation of suspicious results.

---

## 3. Non-Functional Requirements

- **Latency:** UI feedback for keystrokes < 50ms perceived.
- **Availability:** 99.9% monthly availability target for API.
- **Scalability:** Horizontal API scaling and read-optimized leaderboard queries.
- **Consistency:** Strong consistency for profile updates; eventual consistency acceptable for leaderboard materialization.
- **Security:** JWT/session protection, rate limiting, secure password storage.
- **Observability:** Structured logs, metrics, and traces for race submission flow.

---

## 4. High-Level Architecture

```text
[Web Client]
   |  HTTPS + WebSocket (optional)
   v
[API Gateway / BFF]
   |
   +--> [Auth Service] ------> [User DB]
   |
   +--> [Race Service] ------> [Race DB]
   |
   +--> [Ranking Service] ---> [Leaderboard Cache/Store]
   |
   +--> [Anti-Cheat Service]

[Async Queue/Event Bus] <---- Race events ---- [Race Service]
            |
            +--> [Stats Aggregator Worker]
            +--> [Leaderboard Materializer Worker]
```

### Service Responsibilities
- **BFF / API Gateway:** request routing, auth context propagation, response shaping for frontend.
- **Auth Service:** identity, session/token issuance, password reset.
- **Race Service:** prompt assignment, result validation, race persistence.
- **Ranking Service:** rank retrieval, season windows, percentile calculations.
- **Anti-Cheat Service:** heuristic checks and anomaly detection signals.
- **Workers:** asynchronous aggregation to reduce request-path latency.

---

## 5. Data Model (Conceptual)

### 5.1 Core Entities
- `users`
  - `id`, `username`, `email`, `password_hash`, `created_at`, `status`
- `profiles`
  - `user_id`, `display_name`, `avatar_url`, `country`, `bio`
- `prompts`
  - `id`, `language`, `difficulty`, `content`, `word_count`, `is_active`
- `races`
  - `id`, `user_id`, `prompt_id`, `started_at`, `finished_at`, `mode`, `client_version`
- `race_metrics`
  - `race_id`, `wpm`, `cpm`, `accuracy`, `error_count`, `duration_ms`, `score`
- `leaderboard_entries`
  - `window` (daily/weekly/monthly/all-time), `window_start`, `user_id`, `score`, `rank`, `updated_at`
- `audit_events`
  - `id`, `user_id`, `event_type`, `payload`, `created_at`

### 5.2 Storage Strategy
- Relational DB (e.g., PostgreSQL) for transactional entities.
- Redis for hot leaderboard reads and session/rate-limit state.
- Object storage for static assets (avatars, prompt import files).

---

## 6. API Design (v1 Sketch)

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`

### Profile
- `GET /api/v1/me`
- `PATCH /api/v1/me`
- `GET /api/v1/users/{username}`
- `GET /api/v1/users/{username}/stats`

### Race
- `GET /api/v1/races/prompt?difficulty=...&language=...`
- `POST /api/v1/races/start`
- `POST /api/v1/races/{id}/finish`
- `GET /api/v1/races/history?cursor=...`

### Leaderboard
- `GET /api/v1/leaderboards/{window}`
- `GET /api/v1/leaderboards/{window}/around-me`

### Admin
- `GET /api/v1/admin/flags`
- `POST /api/v1/admin/races/{id}/invalidate`

---

## 7. Race Scoring & Ranking Logic

### 7.1 Metric Computation
- `duration_minutes = duration_ms / 60000`
- `gross_wpm = typed_chars / 5 / duration_minutes`
- `net_wpm = max(gross_wpm - penalties, 0)`
- `accuracy = correct_chars / max(typed_chars, 1)`

### 7.2 Composite Score (Example)
```text
score = (net_wpm * 0.7) + (accuracy_percent * 0.3)
```

### 7.3 Rank Materialization
- Append race result event.
- Aggregate by ranking window.
- Recompute or incrementally update leaderboard positions.
- Cache top N per window for fast reads.

---

## 8. Anti-Cheat Strategy (v1)

- Server-side recomputation of all submitted metrics.
- Reject impossible values (e.g., unrealistic WPM thresholds, inconsistent durations).
- Heuristic risk scoring:
  - Extreme variance from user baseline.
  - Repeated perfect patterns with low latency jitter.
  - High score from outdated or untrusted client versions.
- Mark suspicious entries for moderation or shadow exclusion from leaderboards.

---

## 9. Security Design

- Password hashing with Argon2 or bcrypt.
- JWT access token + refresh token rotation.
- IP and account-level rate limiting on auth and race submission endpoints.
- CSRF protections if cookie-based session model is used.
- Input validation and output encoding for all profile fields.
- Audit logging for sensitive state changes.

---

## 10. Performance & Scalability

- CDN for static frontend assets.
- Stateless API instances behind load balancer.
- Read replicas for leaderboard-heavy query paths.
- Redis sorted sets for near-real-time ranking retrieval.
- Async workers for heavy recomputation and historical analytics.

---

## 11. Observability & Reliability

- **Metrics:** API latency, race submit success rate, leaderboard refresh latency.
- **Logs:** structured JSON with request id / user id correlation.
- **Tracing:** distributed traces across BFF, race, ranking, and worker pipelines.
- **SLO Alerts:**
  - p95 API latency breach
  - race submit error spikes
  - leaderboard staleness threshold exceeded

---

## 12. Delivery Roadmap

### Phase 1 — Core MVP
- Solo typing test.
- Auth + user profile basics.
- Race submission and stats history.

### Phase 2 — Competitive Layer
- Daily/weekly/monthly leaderboards.
- Ranking materialization workers.
- Basic anti-cheat checks.

### Phase 3 — Advanced Experience
- Real-time multiplayer races.
- Seasonal events and badges.
- Enhanced analytics and progression insights.

---

## 13. Local Development (Suggested)

```bash
# Example only — update when runtime stack is finalized
# 1) Start database and redis
# 2) Start backend API
# 3) Start frontend app
```

A concrete setup guide should be added once the stack (frontend framework + backend runtime) is finalized.

---

## 14. License

This project is licensed under the [MIT License](./LICENSE).
