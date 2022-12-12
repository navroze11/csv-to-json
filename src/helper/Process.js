const { PromisePool } = require('@supercharge/promise-pool');
const { Db } = require('./db');
const { config } = require('../config/config');

class Process {
  constructor() {
    this.concurrency = config;
  }

  setNext(func) {
    this.next = func;
  }

  /**
   * Process json records concurrently with a given threshhold.
   * Generate the report and show the results.
   * @param {Array} records
   */
  async exec(records) {
    await PromisePool.for(records)
      .withConcurrency(config.concurrencyLimit)
      .process(async (data) => {
        await this.next.exec(data);
      });
    await new Db().generateReport();
  }
}

module.exports = {
  Process
};
