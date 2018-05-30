

// DB-connection String : Sensitive Info should come from environment variables
const dbURI = 'mongodb+srv://<username>:<password>@cluster0-xogjc.mongodb.net/test?retryWrites=true';
const port = process.env.PORT || 10012;
const clientInfoUrl = 'https://jointhecrew.in/clients/';

module.exports = {
  dbURI,
  port,
  clientInfoUrl,
};

