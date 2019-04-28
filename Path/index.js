const { MongoClient, ObjectID } = require("mongodb");
const helpers = require("../helpers");
module.exports = async function(context, req) {
  const { method, query } = req;
  context.log("JavaScript HTTP trigger function processed a request.");
  try {
    switch (method) {
      case "POST":
        console.log("test");
        break;
      default:
        //GET
        let searchQuery = {};
        if (query.id) {
          //validate id format
          if (query.id.length > 23) {
            searchQuery = { _id: ObjectID(query.id) };
          } else {
            searchQuery = { _id: "" };
          }
        }
        const client = await MongoClient.connect(process.env.DBURL, {
          useNewUrlParser: true
        });
        const db = client.db();
        const col = db.collection("paths");
        const docs = await col.find(searchQuery).toArray();

        const response = docs.length == 1 ? docs[0] : docs;
        helpers.toJson(context, response);
        client.close();
        context.done();
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
