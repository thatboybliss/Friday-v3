# Upstash Redis Configuration for Local Development

## Setup Instructions

### 1. Create Upstash Redis Database

1. Go to https://console.upstash.com/
2. Sign up or log in
3. Click "Create Database"
4. Select "Redis"
5. Choose a region close to your deployment
6. Select the "Free" plan (or paid if needed)
7. Click "Create"

### 2. Get Your Credentials

After creating the database:
1. Click on your database
2. Copy the **REST URL** (starts with `https://`)
3. Copy the **REST Token** (your authentication token)

### 3. Update Environment Variables

#### For Local Development

Create a `.env.local` file in your project root:

```bash
# Redis Configuration (Upstash)
UPSTASH_REDIS_REST_URL=https://your-upstash-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

#### For Production (Render.yaml)

The environment variables are already configured in `render.yaml`:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Set these in your Render deployment dashboard or via environment variables.

### 4. Update Application Code

Replace your Redis client implementation with the Upstash SDK:

#### Before (ioredis):
```typescript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);
```

#### After (@upstash/redis):
```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
```

### 5. Install Dependencies

```bash
npm uninstall ioredis
npm install @upstash/redis

# or with pnpm
pnpm remove ioredis
pnpm add @upstash/redis
```

### 6. Key Changes

**Connection Type**: HTTP-based (no direct socket connection)
**API Style**: Promise-based (similar to ioredis)
**Performance**: Slightly higher latency but works globally and behind firewalls
**Cost**: Free tier provides good limits for development

### 7. Common Commands

Most ioredis commands work the same with Upstash:

```typescript
// Set a value
await redis.set('key', 'value');

// Get a value
const value = await redis.get('key');

// Delete a key
await redis.del('key');

// Set with expiration
await redis.setex('key', 3600, 'value');

// Increment
await redis.incr('counter');

// List operations
await redis.lpush('list', 'item');
await redis.lrange('list', 0, -1);
```

### 8. Monitoring

View your Redis usage and statistics:
1. Go to https://console.upstash.com/
2. Click on your database
3. View the "Stats" tab for usage metrics
4. Check "Keys" tab to browse your data

### 9. Troubleshooting

**Connection refused?**
- Verify your REST URL and token are correct
- Check that the token hasn't expired
- Ensure the URL is accessible from your network

**Slow performance?**
- HTTP-based Redis has slightly higher latency than TCP
- This is normal and acceptable for most use cases
- Consider caching results locally if needed

**Development vs Production?**
- Local development can use the same Upstash instance
- Or create a separate free Upstash database for development
- Credentials are stored in `.env` files (never commit them)

---

**Last Updated**: April 26, 2026
