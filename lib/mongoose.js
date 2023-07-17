import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI;
    const db_name = process.env.MONGODB_DB_NAME
    return mongoose.connect(uri, {dbName: db_name});
  }
}