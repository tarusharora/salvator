const phantom = require('phantom');

const { clientInfoMapper } = require('../mappers/clientInfoMapper');
const { addClients } = require('../adaptors/clientAdaptor');
// const _isEmpty = require('lodash/isEmpty');

const scraperAsync = async (url) => {
  try {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.open(url);
    const content = await page.property('content');
    const clientList = clientInfoMapper(content);
    await instance.exit();
    return clientList;
  } catch (err) {
    throw err;
  }
};

const clientScraper = url => new Promise((resolve, reject) => {
  scraperAsync(url)
    .then((clientList) => {
      addClients(clientList)
        .then(() => resolve());
    })
    .catch(err => reject(err));
});

module.exports = {
  clientScraper,
};
