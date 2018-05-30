
const Clients = require('../models/Client');

const addClients = clientList => new Promise((resolve, reject) => {
  Clients.insertMany(clientList, { ordered: false }, (err, clients) => {
    if (err) reject(err);
    resolve(clients);
  });
});

const getAllClients = searchFilter => new Promise((resolve, reject) => {
  Clients.find(searchFilter).lean().exec((err, clients) => {
    if (err) reject(err);
    resolve(clients);
  });
});

const addClient = client => new Promise((resolve, reject) => {
  Clients.insertMany(client, (err) => {
    if (err) reject(err);
    resolve();
  });
});

const getClientById = id => new Promise((resolve, reject) => {
  Clients.findById(id, (err, client) => {
    if (err) reject(err);
    resolve(client);
  });
});

const updateClientById = (id, client) => new Promise((resolve, reject) => {
  Clients.findByIdAndUpdate(id, client, { upsert: true }, (err) => {
    if (err) reject(err);
    resolve();
  });
});

const deleteClientById = id => new Promise((resolve, reject) => {
  Clients.findByIdAndRemove(id, (err) => {
    if (err) reject(err);
    resolve();
  });
});

module.exports = {
  getAllClients,
  addClients,
  addClient,
  getClientById,
  updateClientById,
  deleteClientById,
};
