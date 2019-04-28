const { MongoClient } = require("mongodb");

module.exports = async function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");
    try {
      const client = await MongoClient.connect(process.env.DBURL, {
        useNewUrlParser: true
      });
      const db = client.db();
      const col = db.collection("paths");
      const docs = await col
        .find()
        .toArray();
      context.res = { 
        body: docs,
        headers: { "Content-Type": "application/json" }
      };
      
      client.close();
      context.done();
    } catch (e) {
      console.error(e);
    }

};
