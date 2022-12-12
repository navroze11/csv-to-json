const { Pool } = require('pg');
const { config } = require('../config/config');

class Db {
  constructor() {
    this.pool = new Pool({
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }

  /**
   * Insert json records into the database.
   * @param {Object} record Json record with user information
   */
  async insertData(record) {
    const query = 'INSERT INTO users (name,age,address,additional_info) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [`${record.name.firstName} ${record.name.lastName}`, record.age,
      JSON.stringify(record.address),
      JSON.stringify(record.additional_info)];
    const client = await this.pool.connect();
    try {
      client.query(query, values);
      client.release();
    } catch (err) {
      client.release();
      throw err;
    }
  }

  /**
   * Query the database and create a report.
   */
  async generateReport() {
    const query = `select '20-40',
    count(case when age between 18 and 20 then 1 end) * 100.0 / count(*)
from users

union all 

select '40-60',
    count(case when age between 26 and 40 then 1 end) * 100.0 / count(*)
from users

union all

select '< 20',
    count(case when age < 20 then 1 end) * 100.0 / count(*)
from users

union all

select '60 >',
    count(case when age > 60 then 1 end) * 100.0 / count(*)
from users`;
    const client = await this.pool.connect();
    try {
      const res = await client.query(query);
      this.formatData(res.rows);
      client.release();
    } catch (error) {
      client.release();
      throw error;
    }
  }

  /**
   * Log the message on console via database.
   * @param {Array} distributions percentage distributions with respect to age.
   */
  // eslint-disable-next-line class-methods-use-this
  formatData(distributions) {
    const ageGroups = ['< 20', '20 to 40', '40 to 60', '> 60'];
    let index = 0;
    console.log('Age Group Distribution');
    console.log('==========================');
    distributions.forEach((distribution) => {
      console.log(`(${ageGroups[index]}) -> ${parseFloat(distribution['?column?']).toFixed(2)}`);
      index++;
    });
    console.log('==========================');
  }

  async exec(record) {
    await this.insertData(record);
  }
}

module.exports = {
  Db
};
