const { Db } = require('./db');
const { Json } = require('./json');
const { Process } = require('./Process');

/**
 * Used Chain of Responsibility Design pattern to execute steps one by one
 * The first step in the chain will create a JSON structure and assign values in the structure
 * The second step will process the records concurrently with a concurrency threshhold
 * The starting point of the logic can be found on line 22. This is where the execution \
 * of the code will begin.
 */
class CsvToJson {
  constructor(filePath) {
    this.filePath = filePath;
  }

  exec() {
    try {
      const jsonSchema = new Json();
      const process = new Process();
      const db = new Db();
      jsonSchema.setNext(process);
      process.setNext(db);
      jsonSchema.exec(this.filePath);
    } catch (error) {
      console.error('Error found in executing CsvToJson', error.stack, 'message', error.message);
    }
  }
}

module.exports = {
  CsvToJson,
};
