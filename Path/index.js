const { MongoClient, ObjectID } = require("mongodb");
const helpers = require("../helpers");
const jwt = require('jsonwebtoken');
const methods= require('./methods');
const auth = require('./auth');
module.exports = async function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");
  try {
    const isLogged = await auth.checkToken(req);
    if(isLogged.nickname){
      await methods(context, req, isLogged);
    }    
  } catch (e) {
    console.error(e);
    helpers.toJson(context, { "error": e.message});
  }
};
