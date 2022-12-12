const { faker } = require('@faker-js/faker');
const { Process } = require('./src/helper/Process');

function randomBetween(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}

function createRandomUser() {
  return {
    name: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    },
    age: randomBetween(15, 90),
    address: {
      streetAddress: faker.address.streetAddress(),
      streetNumber: faker.address.buildingNumber()
    },
    additional_info: {
      gender: 'male',
      contact: {
        landLine: 123,
        mobile: 456
      }
    }
  };
}

async function seedUsers(userCount) {
  const users = [];
  Array.from({ length: userCount }).forEach(() => {
    users.push(createRandomUser());
  });
  // console.log(JSON.stringify(users, null, 3));
  new Process().exec(users, true);
  console.log('Connection will automatically terminate after sometime');
}

seedUsers(100);
