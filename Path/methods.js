const { MongoClient, ObjectID } = require("mongodb");
const helpers = require("../helpers");

module.exports = async (context, {method, query, body}, isLogged)=>{
    const client = await MongoClient.connect(process.env.DBURL, {
        useNewUrlParser: true
    });
    const db = client.db();
    const col = db.collection("paths");
    let validPath;
    switch (method) {
      case "POST":
        validPath = helpers.formatPath(body, "POST", isLogged);
        if (!validPath) return false;
        const inserted = await col.insert(validPath);
        if (inserted.insertedCount > 0) {
          helpers.toJson(context, inserted.ops[0]);
        } else {
          helpers.toJson(context, {});
        }
        break;
      case "PUT":
        if (!body._id) return false;
        validPath = helpers.formatPath(body,"PUT",isLogged);
        if (!validPath) return false;
        const updated = await col.updateOne(
          { _id: ObjectID(body._id) },
          { $set: validPath }
        );
        if (updated.modifiedCount > 0) {
          helpers.toJson(context, body);
        } else {
          helpers.toJson(context, {});
        }
        break;
      case "DELETE":
        if (!query._id) return false;
        const deleted = await col.deleteOne(
          { _id: ObjectID(query._id) }
        );
        if (deleted.deletedCount > 0) {
          helpers.toJson(context, {"status":"deleted"});
        } else {
          helpers.toJson(context, {});
        }
        break;
      default:
        //GET
        let searchQuery = { "user":isLogged.nickname };
        if (query._id) {
          //validate id format
          if (query._id.length > 23) {
            searchQuery = {...searchQuery, _id: ObjectID(query._id) };
          } else {
            searchQuery = {...searchQuery, _id: ""};
          }
        }
        console.log(searchQuery)
        const docs = await col.find(searchQuery).toArray();

        const response = (docs.length  == 1 && query._id)? docs[0] : docs;
        helpers.toJson(context, response);
        break;
    }
    client.close();
    context.done();
  
}
