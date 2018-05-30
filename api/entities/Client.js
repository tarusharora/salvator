class Client {
  constructor({
    _id, name, phoneNumber, email, company, zipCode,
  }) {
    this.id = _id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.company = company;
    this.zipCode = zipCode;
  }
}

module.exports = {
  Client,
};
