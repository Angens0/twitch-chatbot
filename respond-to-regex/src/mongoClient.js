const MongoClient = require("mongodb").MongoClient;

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const getExpressions = () =>
    new Promise((resolve, reject) => {
        client.connect(err => {
            if (err) {
                return reject(err);
            }

            const collection = client
                .db("expressions")
                .collection("expressions");

            collection.find({}).toArray((error, docs) => {
                if (error) {
                    return reject(error);
                }

                client.close();

                return resolve(docs);
            });
        });
    });

module.exports = { mongoClient: client, getExpressions };
