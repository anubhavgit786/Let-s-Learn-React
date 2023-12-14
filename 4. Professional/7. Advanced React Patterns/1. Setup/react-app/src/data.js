import { faker } from "@faker-js/faker";

export const products = Array.from({ length: 20 }, () => {
  return {
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price()
  };
});

export const companies = Array.from({ length: 15 }, () => {
  return {
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase()
  };
});