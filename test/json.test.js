const assert = require('assert');
const { Json } = require('../src/helper/json');
const { jsonSchemaData } = require('./test-data');

describe('Json Structure', async () => {
  it('create Json Structure with age and name', async () => {
    const json = new Json();
    const output = json.createJsonSchema(jsonSchemaData.headersWithTwoFields.input);
    assert.deepEqual(output, jsonSchemaData.headersWithTwoFields.expectedOutput);
  });

  it('create Json Structure with age, name and gender', async () => {
    const json = new Json();
    const output = json.createJsonSchema(jsonSchemaData.headersWithGender.input);
    assert.deepEqual(output, jsonSchemaData.headersWithGender.expectedOutput);
  });

  it('create nested structure with oneNestedProperty', async () => {
    const json = new Json();
    const nestedSchema = {};
    json.createNestedProperty(jsonSchemaData.oneNestedProperty.input, nestedSchema);
    assert.deepEqual(nestedSchema, jsonSchemaData.oneNestedProperty.expectedOutput);
  });

  it('create nested structure with twoNestedProperty', async () => {
    const json = new Json();
    const nestedSchema = {};
    json.createNestedProperty(jsonSchemaData.twoNestedProperty.input, nestedSchema);
    assert.deepEqual(nestedSchema, jsonSchemaData.twoNestedProperty.expectedOutput);
  });

  it('create Json Structure with with two nested fields', async () => {
    const json = new Json();
    const output = json.createJsonSchema(jsonSchemaData.headersWithTwoNestedFields.input);
    assert.deepEqual(output, jsonSchemaData.headersWithTwoNestedFields.expectedOutput);
  });


  it('create Json Structure with information', async () => {
    const json = new Json();
    json.createAdditionalInfo(jsonSchemaData.jsonRecordWithPhone.input);
    assert.deepEqual(jsonSchemaData.jsonRecordWithPhone.input[0], jsonSchemaData.jsonRecordWithPhone.expectedOutput);
  });
});
