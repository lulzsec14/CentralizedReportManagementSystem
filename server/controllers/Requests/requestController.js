const Requests = require('../../models/Requests');
const factory = require('../DAO/dao');

exports.getRequest = factory.getOne(Requests);
exports.updateRequest = factory.updateOne(Requests);
exports.deleteRequest = factory.deleteOne(Requests);
