const { CsvToJson } = require('../helper/csv-to-json');
const { config } = require('../config/config');

const jsonToCsvController = {};

jsonToCsvController.getJson = async (req, res) => {
  try {
    const jsonToCsv = new CsvToJson(config.csv.path);
    const json = await jsonToCsv.exec();
    res.status(200).json({ data: json });
  } catch (error) {
    console.error('Error in jsonToCsvController', error);
    res.status(400).json({ message: 'Something went wrong', error: true });
  }
};

module.exports = jsonToCsvController;
