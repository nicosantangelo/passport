# DEV.md

## Purpose
Simple website to generate fake identity data for temporary signups and testing.

## Core Features

### 1. Form Data Generator
Generate fake data for signup forms:
- Name (first + last)
- Phone number
- Address
- Postal code
- Date of birth (with age range selector)
- Gender (affects name generation)
- Username suggestions
- Password generator
- Profile picture/avatar (link to services or generate)
- SSN/national ID numbers (fake, country-specific)
- Country scoped (data matches selected country format)

### 2. Temporary Email
- Initially: link/iframe to https://temp-mail.org/en/
- Future: host our own temp email service

### 3. SMS Code Receiver
- Initially: link/iframe to external SMS providers
- Future: host our own SMS receiving service

### 4. Payment Testing
Generate test payment data:
- Credit card numbers (test cards with Luhn validation)
- CVV codes
- Expiry dates
- IBAN/bank account numbers (country-specific)

## Technical Requirements
- No tracking/analytics (privacy-focused)

## Future Work
- Public API for programmatic access
- Browser extension for auto-filling forms
- Webhooks for email/SMS notifications

## Use Cases
- Signup for one-time verification codes
- Testing signup flows
- Temporary accounts that don't need persistence
