const fs = require('fs');
const csv = require('csv-parser');

const { userSchema } = require('../models/schemas/json-schemas');

const allowedJsonProperties = {
  name: true,
  age: true,
  address: true,
  additional_info: true
};

class Json {
  constructor() {
    this.jsonSchema = {};
    this.next = null;
    this.jsonRecords = [];
  }

  setNext(func) {
    this.next = func;
  }

  /**
   * @param {*} property the property for inserting information into the jsonSchema
   * @param {*} properties The list of properties used for traversing the json strcuture recursively
   * @param {*} data a single json record retrieved from parsing the csv
   * @param {*} jsonSchema The created jsonSchema.
   * @param {*} index used for terminating the recursion
   * @returns void
   */
  traverseAndAssign(property, properties, data, jsonSchema, index) {
    // Last property in properties array to terminate condition. Assign value from data
    if (index === properties.length - 1) {
      jsonSchema[properties[index]] = data[property];
      return;
    }
    const traverse = properties[index];
    this.traverseAndAssign(property, properties, data, jsonSchema[traverse], index + 1);
  }

  /**
   * @param {Array} properties individual properties example name.firstName
   * split into [name, firstName]
   * @param {Object} nestedPropertyObject traverse the nestedPropertyObject using recursion
   * @returns void
   */
  createNestedProperty(properties, nestedPropertyObject) {
    if (properties.length === 0) {
      return;
    }
    if (properties[0] in nestedPropertyObject) {
      const property = properties.shift();
      this.createNestedProperty(properties, nestedPropertyObject[property]);
    } else {
      const property = properties.shift();
      nestedPropertyObject[property] = {};
      this.createNestedProperty(properties, nestedPropertyObject[property]);
    }
  }

  /**
   * It will create a jsonStructure defined in the test for populating information from csv.
   * The structure can be found in the test file for better clarity.
   * @param {Array} headers from csv
   * @returns predefined json with empty objects
   */
  createJsonSchema(headers) {
    const jsonSchema = {};
    headers.forEach((header) => {
      const properties = header.split('.');
      if (properties.length > 1) {
        this.createNestedProperty(properties, jsonSchema);
      } else if (properties.length === 1) {
        jsonSchema[properties[0]] = {};
      }
    });
    return jsonSchema;
  }

  /**
   * Assigns values to each individual entry
   * @param {Object} data A row entry reprsented as JSON.
   * @param {Object} jsonSchema
   * @returns {Object} of type jsonSchema with all the values populated.
   */
  assignValues(data, jsonSchema) {
    const schema = { ...jsonSchema };
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      const properties = keys[i].split('.');
      this.traverseAndAssign(keys[i], properties, data, schema, 0);
    }
    return schema;
  }

  /**
   * Create additional_info object and delete remaining objects such as phone_no, gender etc.
   * Place the additional info in addtional info object.
   * final json structure with user data populated
   * @param {Array} jsonRecords filled with user data.
   */
  // eslint-disable-next-line class-methods-use-this
  createAdditionalInfo(jsonRecords) {
    jsonRecords.map((record) => {
      record.additional_info = {};
      Object.keys(record).forEach((key) => {
        if (!(key in allowedJsonProperties)) {
          record.additional_info[key] = record[key];
          delete record[key];
        }
      });
      return record;
    });
  }

  /**
   * Following actions will take place
   * Create Json Structure(Schema)
   * Validate if the structure contains the mandatory fields such as name and age using joi.
   * Populate the Json Structure with user data.
   * Create a new object called additional_info.
   * Pass the created json objects to the next chain for processing and storing the data.
   * @param {string} filePath containing the path to the csv.
   */
  async exec(filePath) {
    return new Promise((resolve, reject) => {
      try {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('headers', (headers) => {
            this.jsonSchema = this.createJsonSchema(headers);
            const { error } = userSchema.validate(this.jsonSchema);
            if (error) throw Error(error.message);
          })
          .on('data', (data) => {
            const record = JSON.parse(JSON.stringify(this.assignValues(data, this.jsonSchema)));
            this.jsonRecords.push(record);
          })
          .on('end', async () => {
            this.createAdditionalInfo(this.jsonRecords);
            const response = await this.next.exec(this.jsonRecords, false);
            resolve(response);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = {
  Json
};
