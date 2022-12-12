const jsonSchemaData = {
  headersWithTwoFields:{
    input: ['name.firstName', 'name.lastName', 'age'],
    expectedOutput : {
      name: {
        firstName: {},
        lastName: {}
      },
      age: {}
    }
  },
  headersWithGender : {
    input: ['name.firstName', 'name.lastName', 'age', 'gender'],
    expectedOutput : {
      name: {
        firstName: {},
        lastName: {}
      },
      age: {},
      gender: {}
    }
  },
  headersWithTwoNestedFields : {
    input: ['name.firstName', 'name.lastName', 'age', 'gender', 'contact.landline',
    'contact.mobile'],
    expectedOutput : {
      name: {
        firstName: {},
        lastName: {}
      },
      contact: {
        landline: {},
        mobile: {}
      },
      age: {},
      gender: {}
    }
  },
  jsonRecordWithPhone:{
    input: [{
      name: { firstName: 'Claire', lastName: 'Raider' },
      age: '18',
      address: {
        line1: 'Tales Street',
        line2: 'North Avenue',
        city: 'New York',
        state: 'New York'
      },
      gender: 'Female',
      phone: { landline: '12345', mobile: '6789' }
    }],
    expectedOutput: {
      name: { firstName: 'Claire', lastName: 'Raider' },
      age: '18',
      address: {
        line1: 'Tales Street',
        line2: 'North Avenue',
        city: 'New York',
        state: 'New York'
      },
      additional_info: { gender: 'Female', phone: { landline: '12345', mobile: '6789' } }
    }
  },
  oneNestedProperty:{
    input: ["name", "firstName"],
    expectedOutput: {
      name:{
        firstName: {}
      }
    }
  },
  twoNestedProperty: {
    input: ["name", "firstName", "initial"],
    expectedOutput: {
      name:{
        firstName: {
          initial: {}
        }
      }
    }
  }
};

module.exports = {
  jsonSchemaData
};
