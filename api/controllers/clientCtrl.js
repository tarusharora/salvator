const {
  getAllClients, addClient, getClientById, updateClientById, deleteClientById,
} = require('../adaptors/clientAdaptor');
const { mapClientList, mapClient, mapClientFilters } = require('../mappers/clientInfoMapper');
const _isEmpty = require('lodash/isEmpty');
const _get = require('lodash/get');

const getClients = (req, res) => {
  const clientName = _get(req, 'query.name');
  const clientNumber = _get(req, 'query.number');
  const clientEmail = _get(req, 'query.email');
  const clientSearchFilters = mapClientFilters({ clientName, clientNumber, clientEmail });
  return getAllClients(clientSearchFilters)
    .then((clients) => {
      const clientList = mapClientList(clients);
      return res.send(clientList);
    })
    .catch(err =>
      // TODO Log error
      res.send(500, err));
};

const createClient = (req, res) => {
  const clientCreateRequest = mapClient(req.body);
  return addClient(clientCreateRequest)
    .then(() => res.send(201, {}))
    .catch((err) => {
      // TODO Log error
      res.send(500, err);
    });
};

const getClient = (req, res) => {
  const clientId = req.swagger.params.id.value;
  return getClientById(clientId)
    .then((client) => {
      if (_isEmpty(client)) {
        return res.send(404, {});
      }
      return res.send(mapClient(client));
    })
    .catch((err) => {
      // TODO Log error
      res.send(500, err);
    });
};

const updateClient = (req, res) => {
  const clientId = req.swagger.params.id.value;
  const clientUpdateRequest = mapClient(req.body);
  return updateClientById(clientId, clientUpdateRequest)
    .then(() => res.send(204, {}))
    .catch((err) => {
      // TODO Log error
      res.send(500, err);
    });
};

const deleteClient = (req, res) => {
  const clientId = req.swagger.params.id.value;
  return deleteClientById(clientId)
    .then(() => res.send(204, {}))
    .catch((err) => {
      // TODO Log error
      res.send(500, err);
    });
};

module.exports = {
  getClients,
  createClient,
  getClient,
  updateClient,
  deleteClient,
};
