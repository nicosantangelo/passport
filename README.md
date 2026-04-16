# Passport

Fake data generator for temporary signups and testing.

https://passport.nicosantangelo.com

## CLI

Generate a fake identity from the terminal:

```bash
./passport
```

```bash
┌──────────────────────────────────────────────┐
│  INTERNET PASSPORT                        🇨🇦 │
├──────────────────────────────────────────────┤
│  GIVEN NAME        Dennis                    │
│  SURNAME           Yundt                     │
│  DATE OF BIRTH     12/09/1955                │
│  SEX               male                      │
│  PHONE             +12909331397              │
│  ADDRESS           51738 Stracke Road        │
│  COUNTRY           Canada                    │
│  CITY              Laval                     │
│  STATE             Manitoba                  │
│  ZIP CODE          N7Q 3E5                   │
│                                              │
│  P<CANYUNDT<<DENNIS<<<<<<<<<<<<<<<<<<<<<<<<<<│
│  ID0000000<0CAN5512090F3001010<<<<<<<<<<<<00<│
├──────────────────────────────────────────────┤
│  DIGITAL VISA                                │
├──────────────────────────────────────────────┤
│  USERNAME          Connie46                  │
│  PASSWORD          7FpTFaPVbN1ZQSW           │
│                                              │
│  TEMP EMAIL        temp-mail.org             │
│                    guerrillamail.com         │
│                    maildrop.cc               │
│                    10minutemail.com          │
│                    yopmail.com               │
│                    emailondeck.com           │
│                                              │
│  SMS RECEIVER      receive-sms.io            │
│                    quackr.io                 │
│                    anonymsms.com             │
└──────────────────────────────────────────────┘
```

Output as JSON (for piping into `jq`, scripts, etc):

```bash
./passport --json
```

```json
{
  "firstName": "Marcos",
  "lastName": "Barros",
  "sex": "Masculino",
  "phone": "+5554411165117",
  "address": "918 Avenida Júlia",
  "country": "Brazil",
  "countryCode": "BRA",
  "countryFlag": "🇧🇷",
  "city": "Manuela do Descoberto",
  "state": "Rio Grande do Sul",
  "zip": "65767-805",
  "dob": "04/09/1960",
  "username": "Felicia_Santos",
  "password": "SR7sQx_PqIe6kiV"
}
```


## Development

```bash
npm install
npm run dev

npm run cli
npm run cli -- --json
```

Run tests:

```bash
npm test
```
