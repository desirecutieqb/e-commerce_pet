import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = { useUnifiedTopology: true, useNewUrlParser: true };

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Brak zmiennej środowiskowej MONGODB_URI");
}

if (process.env.NODE_ENV === "development") {
  // W trakcie developmentu możesz użyć globalnego obiektu,
  // aby ponownie wykorzystywać połączenie
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;