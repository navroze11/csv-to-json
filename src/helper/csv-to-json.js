const { Db } = require('./db');
const { Json } = require('./json');
const { Process } = require('./Process');

/**
 * Used Chain of Responsibility Design pattern to execute steps one by one
 * The first step in the chain will create a JSON structure and assign values in the structure
 * The second step will process the records concurrently with a concurrency threshold and create
 * a report
 */
class CsvToJson {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async exec() {
    try {
      const json = new Json();
      const process = new Process();
      const db = new Db();
      json.setNext(process);
      process.setNext(db);
      return await json.exec(this.filePath);
    } catch (error) {
      console.error('Error found in executing CsvToJson', error.stack, 'message', error.message);
      throw error;
    }
  }
}

module.exports = {
  CsvToJson,
};
