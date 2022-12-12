const { PromisePool } = require('@supercharge/promise-pool');
const { Db } = require('./db');
const { config } = require('../config/config');

class Process {
  constructor() {
    this.concurrency = config.concurrencyLimit;
  }

  setNext(func) {
    this.next = func;
  }

  /**
   * Process json records concurrently with a given threshhold.
   * Generate the report and show the results.
   * @param {Array} records
   * @param {Boolean} seed if seed is set to true manually assign Db as the next chain of
   * responsibility. Also skip generating the report with seed is set to true
   */
  async exec(records, seed) {
    try {
      if (seed) this.setNext(new Db());
      await PromisePool.for(records)
        .withConcurrency(this.concurrency)
        .process(async (data) => {
          await this.next.exec(data);
        });
      if (!seed) new Db().generateReport();
      return records;
    } catch (error) {
      console.log('Found error', error);
      throw error;
    }
  }
}

module.exports = {
  Process
};
