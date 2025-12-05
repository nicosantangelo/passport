# TODO

## Phase 1: Project Setup
- [ ] Initialize Vite + React project with TypeScript
- [ ] Install and configure shadcn/ui
- [ ] Install @ngneat/falso for fake data generation
- [ ] Set up basic project structure (components/, lib/, etc.)
- [ ] Configure Vite to output static HTML for deployment
- [ ] Create basic layout component (header, main content area)

## Phase 2: Core UI Shell
- [ ] Create main page layout with sections for:
  - Generated identity data display
  - Temp email section
  - SMS receiver section
- [ ] Add "Generate Identity" button
- [ ] Set up copy-to-clipboard functionality for each field
- [ ] Basic responsive design (mobile-friendly)

## Phase 3: MVP Features - Identity Generator
- [ ] Generate and display:
  - First name
  - Last name
  - Phone number (US format)
  - Street address (US)
  - City, State, ZIP code
  - Date of birth with age range selector
  - Username suggestions
  - Password (with strength options)
- [ ] "Generate All" button to populate all fields at once
- [ ] Individual "regenerate" button per field
- [ ] Gender selector (affects name generation)

## Phase 4: MVP Features - External Services
- [ ] Temp Email section:
  - Embed or link to https://temp-mail.org/en/
  - Clear instructions for user
- [ ] SMS Receiver section:
  - Research and link to reliable SMS receiver service
  - Clear instructions for user

## Phase 5: Polish
- [ ] Add clear explanation of project purpose on page
- [ ] Ensure no analytics/tracking
- [ ] Add basic error handling
- [ ] Test all generation functionality
- [ ] Verify static build works correctly
- [ ] Add minimal styling polish

## Not Implementing Yet (Future Work)
- Payment testing (credit cards, CVV, IBAN)
- Profile picture/avatar generation
- SSN/national ID generation
- Country selection (multi-country support)
- Export identity as JSON/CSV
- Session history
- Self-hosted temp email service
- Self-hosted SMS receiver
- Public API
- Browser extension
- Webhooks for notifications
