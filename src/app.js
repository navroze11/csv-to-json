const { CsvToJson } = require('./helper/csv-to-json');
const { config } = require('./config/config');

const jsonToCsv = new CsvToJson(config.csv.path);
jsonToCsv.exec();
