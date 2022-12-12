const { faker } = require('@faker-js/faker');

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
    address:{
      streetAddress: faker.address.streetAddress(),
      streetNumber: faker.address.buildingNumber()
    },
    additional_info:{
      gender: 'male',
      contact:{
        landLine: faker.phone.number(),
        mobile: faker.phone.number()
      }
    }
  };
}

function seedUsers(userCount) {
  const users = [];
  Array.from({ length: userCount }).forEach(() => {
    users.push(createRandomUser());
  });
  return users;
}

seedUsers();
module.exports = {
  seedUsers
}







