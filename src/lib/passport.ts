import type { Faker } from "@faker-js/faker";
import { faker as fakerEN } from "@faker-js/faker/locale/en";
import { faker as fakerENCA } from "@faker-js/faker/locale/en_CA";
import { faker as fakerESMX } from "@faker-js/faker/locale/es_MX";
import { faker as fakerPTBR } from "@faker-js/faker/locale/pt_BR";
import { faker as fakerES } from "@faker-js/faker/locale/es";
import { faker as fakerRU } from "@faker-js/faker/locale/ru";
import { faker as fakerSV } from "@faker-js/faker/locale/sv";
import { faker as fakerPTPT } from "@faker-js/faker/locale/pt_PT";
import { faker as fakerENGB } from "@faker-js/faker/locale/en_GB";
import { faker as fakerDE } from "@faker-js/faker/locale/de";
import { faker as fakerFR } from "@faker-js/faker/locale/fr";
import { faker as fakerIT } from "@faker-js/faker/locale/it";
import { faker as fakerNL } from "@faker-js/faker/locale/nl";
import { faker as fakerPL } from "@faker-js/faker/locale/pl";
import { faker as fakerJA } from "@faker-js/faker/locale/ja";
import { faker as fakerKO } from "@faker-js/faker/locale/ko";
import { faker as fakerZHCN } from "@faker-js/faker/locale/zh_CN";
import { faker as fakerENIN } from "@faker-js/faker/locale/en_IN";
import { faker as fakerENAU } from "@faker-js/faker/locale/en_AU";
import { faker as fakerENZA } from "@faker-js/faker/locale/en_ZA";
import { faker as fakerTR } from "@faker-js/faker/locale/tr";

type LocaleConfig = {
  faker: Faker;
  iso2: string;
  icao: string;
  name: string;
};

const LOCALES: LocaleConfig[] = [
  { faker: fakerEN,   iso2: "US", icao: "USA", name: "United States"  },
  { faker: fakerENCA, iso2: "CA", icao: "CAN", name: "Canada"         },
  { faker: fakerESMX, iso2: "MX", icao: "MEX", name: "Mexico"         },
  { faker: fakerPTBR, iso2: "BR", icao: "BRA", name: "Brazil"         },
  { faker: fakerRU,   iso2: "RU", icao: "RUS", name: "Russia"         },
  { faker: fakerSV,   iso2: "SE", icao: "SWE", name: "Sweden"         },
  { faker: fakerPTPT, iso2: "PT", icao: "PRT", name: "Portugal"       },
  { faker: fakerENGB, iso2: "GB", icao: "GBR", name: "United Kingdom" },
  { faker: fakerDE,   iso2: "DE", icao: "D",   name: "Germany"        },
  { faker: fakerFR,   iso2: "FR", icao: "FRA", name: "France"         },
  { faker: fakerES,   iso2: "ES", icao: "ESP", name: "Spain"          },
  { faker: fakerIT,   iso2: "IT", icao: "ITA", name: "Italy"          },
  { faker: fakerNL,   iso2: "NL", icao: "NLD", name: "Netherlands"    },
  { faker: fakerPL,   iso2: "PL", icao: "POL", name: "Poland"         },
  { faker: fakerJA,   iso2: "JP", icao: "JPN", name: "Japan"          },
  { faker: fakerKO,   iso2: "KR", icao: "KOR", name: "South Korea"    },
  { faker: fakerZHCN, iso2: "CN", icao: "CHN", name: "China"          },
  { faker: fakerENIN, iso2: "IN", icao: "IND", name: "India"          },
  { faker: fakerENAU, iso2: "AU", icao: "AUS", name: "Australia"      },
  { faker: fakerENZA, iso2: "ZA", icao: "ZAF", name: "South Africa"   },
  { faker: fakerTR,   iso2: "TR", icao: "TUR", name: "Turkey"         },
];

export type Passport = {
  firstName: string;
  lastName: string;
  sex: string;
  phone: string;
  address: string;
  country: string;
  countryCode: string;
  countryFlag: string;
  city: string;
  state: string;
  zip: string;
  dob: string;
  email: string;
  username: string;
  password: string;
};

export type Provider = {
  name: string;
  url: string;
};

export const EMAIL_PROVIDERS: Provider[] = [
  { name: "temp-mail.org", url: "https://temp-mail.org/en/" },
  { name: "guerrillamail.com", url: "https://www.guerrillamail.com/" },
  { name: "maildrop.cc", url: "https://maildrop.cc/" },
  { name: "10minutemail.com", url: "https://10minutemail.com/" },
  { name: "yopmail.com", url: "https://yopmail.com/" },
  { name: "emailondeck.com", url: "https://www.emailondeck.com/" },
];

export const SMS_PROVIDERS: Provider[] = [
  { name: "receive-sms.io", url: "https://receive-sms.io/" },
  { name: "quackr.io", url: "https://quackr.io/" },
  { name: "anonymsms.com", url: "https://anonymsms.com/" },
];

function getCountryFlag(iso2: string): string {
  return iso2
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

export function generatePassport(): Passport {
  const locale = LOCALES[Math.floor(Math.random() * LOCALES.length)];
  const { faker } = locale;

  const dob = faker.date.between({
    from: new Date(new Date().getFullYear() - 80, 0, 1),
    to: new Date(new Date().getFullYear() - 18, 11, 31),
  });
  const month = String(dob.getMonth() + 1).padStart(2, "0");
  const day = String(dob.getDate()).padStart(2, "0");
  const year = dob.getFullYear();

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    sex: faker.person.sex(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    country: locale.name,
    countryCode: locale.icao,
    countryFlag: getCountryFlag(locale.iso2),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
    dob: `${month}/${day}/${year}`,
    email: "",
    username: faker.internet.username(),
    password: faker.internet.password(),
  };
}
