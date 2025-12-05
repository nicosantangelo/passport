# new-identity

Fake identity generator for temporary signups and testing.

## What it does

Generates fake personal data for testing signup flows:
- Names, addresses, phone numbers
- Date of birth, usernames, passwords
- Temp email (external service)
- SMS receiver (external service)

Privacy-focused: no tracking, client-side only.

## Tech

- React + TypeScript + Vite
- shadcn/ui
- @ngneat/falso (fake data generation)
- Static site (no backend)

## Development

```bash
npm install
npm run dev
```

## Status

WIP - See TODO.md for planned features.

## Why

For testing and one-time signups without using real personal information.
