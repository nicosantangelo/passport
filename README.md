# Passport

Fake data generator for temporary signups and testing.

## What it does

Generates fake personal data for testing signup flows:
- Names, addresses, phone numbers
- Date of birth, usernames, passwords
- Temp email (external service)
- SMS receiver (external service)

Privacy-focused: no tracking, client-side only.

## CLI

Generate a fake identity from the terminal:

```bash
./passport
```

Output as JSON (for piping into `jq`, scripts, etc.):

```bash
./passport --json
```

Also available via npm:

```bash
npm run cli
npm run cli -- --json
```

## Development

```bash
npm install
npm run dev
```

Run tests:

```bash
npm test
```
