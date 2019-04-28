const { MongoClient, ObjectID } = require("mongodb");
const helpers = require("../helpers");
module.exports = async function(context, req) {
  const { method, query } = req;
  context.log("JavaScript HTTP trigger function processed a request.");
  try {
    const client = await MongoClient.connect(process.env.DBURL, {
        useNewUrlParser: true
      });
    const db = client.db();
    const col = db.collection("paths");
    switch (method) {
      case "POST":
        const validPath = helpers.formatPath(req.body);
        if (!validPath) return false;
        const inserted = await col.insert(validPath);
        if (inserted.insertedCount >0){
            helpers.toJson(context, inserted.ops[0]);
        }else{
            helpers.toJson(context, {});
        }
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
        
        const docs = await col.find(searchQuery).toArray();

        const response = docs.length == 1 ? docs[0] : docs;
        helpers.toJson(context, response);
        break;
    }
    client.close();
    context.done();
  } catch (e) {
    console.error(e);
  }
};
