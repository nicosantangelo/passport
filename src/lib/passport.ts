import {
  randFirstName,
  randLastName,
  randStreetAddress,
  randCity,
  randState,
  randZipCode,
  randBetweenDate,
  randUserName,
  randPassword,
  randNumber,
  randGender,
} from "@ngneat/falso";

export type Passport = {
  firstName: string;
  lastName: string;
  sex: string;
  phone: string;
  address: string;
  country: string;
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

export function generatePassport(): Passport {
  const now = new Date();
  const from = new Date(now.getFullYear() - 80, 0, 1);
  const to = new Date(now.getFullYear() - 18, 11, 31);
  const dob = randBetweenDate({ from, to });
  const month = String(dob.getMonth() + 1).padStart(2, "0");
  const day = String(dob.getDate()).padStart(2, "0");
  const year = dob.getFullYear();

  const areaCode = randNumber({ min: 200, max: 999 });
  const prefix = randNumber({ min: 200, max: 999 });
  const line = String(randNumber({ min: 0, max: 9999 })).padStart(4, "0");

  return {
    firstName: randFirstName(),
    lastName: randLastName(),
    sex: randGender(),
    phone: `+1 (${areaCode}) ${prefix}-${line}`,
    address: randStreetAddress(),
    country: "United States of America",
    city: randCity(),
    state: randState(),
    zip: randZipCode(),
    dob: `${month}/${day}/${year}`,
    email: "",
    username: randUserName(),
    password: randPassword(),
  };
}
