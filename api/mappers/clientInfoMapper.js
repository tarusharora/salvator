const cheerio = require('cheerio');

const _isEmpty = require('lodash/isEmpty');

const { Client } = require('../entities/Client');


// const Client = require('../entities/Client').Client;

const validateClients = (clientList) => {
  if (!_isEmpty(clientList) && Array.isArray(clientList)) {
    return clientList.filter((client) => {
      // TODO Necessary Validations
      if (!_isEmpty(client.phoneNumber) && !_isEmpty(client.zipCode) && client.zipCode.length === 6) return true;
      return false;
    });
  }
  return [];
};

const clientInfoMapper = (content) => {
  const $ = cheerio.load(content);
  // var AoA = $('table tr').map(function(){
  //     return [
  //         $('td',this).map(function(){
  //             return $(this).text();
  //         }).get()
  //     ];
  // }).get();
  // var json = JSON.stringify(AoA);
  const result = $('table tr').map((i, element) => (
    {
      name: $(element).find('td:nth-of-type(1)').text().trim(),
      phoneNumber: $(element).find('td:nth-of-type(2)').text().trim(),
      email: $(element).find('td:nth-of-type(3)').text().trim(),
      company: $(element).find('td:nth-of-type(4)').text().trim(),
      zipCode: $(element).find('td:nth-of-type(5)').text().trim(),

    }
  )).get();
  return validateClients(result);
};


const mapClient = (client) => {
  if (!_isEmpty(client)) {
    const {
      _id, company, email, name, phoneNumber, zipCode,
    } = client;
    return new Client({
      _id,
      company,
      email,
      name,
      phoneNumber,
      zipCode,
    });
  }
  return new Client({});
};

const mapClientList = (clients) => {
  const clientList = [];
  if (Array.isArray(clients)) {
    clients.forEach(client => clientList.push(mapClient(client)));
  }
  return clientList;
};

const mapClientFilters = ({ clientName, clientNumber, clientEmail }) => {
  const clientSearchFilter = {};
  if (!_isEmpty(clientName)) clientSearchFilter.name = clientName;
  if (!_isEmpty(clientNumber)) {
    clientSearchFilter.phoneNumber = clientNumber;
  }
  if (!_isEmpty(clientEmail)) clientSearchFilter.email = clientEmail;
  return clientSearchFilter;
};

module.exports = {
  clientInfoMapper,
  mapClientList,
  mapClient,
  mapClientFilters,
};

