import { MongoClient, Db } from "mongodb";

let cacheDb: Db | null = null;
let client: MongoClient | null = null;


async function connectToDatabase() {
    // console.log("Reached connectToDatabase");
    
    if(cacheDb){
        try {
            await cacheDb.command({ ping: 1 });
            return cacheDb;
        } catch (error) {
            console.log("Cache DB connection failed, reconnecting...");
            cacheDb = null;
            if(client) {
                await client.close();
            }
        }
        // console.log("Here");
    }
    
    try {
        // console.log("Inside try");
        
        client = await MongoClient.connect(process.env.MONGODB_URI, {
            connectTimeoutMS: 10000,
            socketTimeoutMS: 10000,
            serverSelectionTimeoutMS: 10000,
            maxPoolSize: 10,
            minPoolSize: 5,
            retryWrites: true,
            retryReads: true,
        });
       
        console.log("MongoDB connected Successfully");
        client.on('error', (error)=>{
            console.log("MongoDB connection error: ", error);
            cacheDb = null;
        });

        const db = client.db('usersDB');
        cacheDb = db;
        return db;
      
    } catch (error) {
        console.error("MongoDB connection error: ", error);
        cacheDb = null;
        if(client) {
            await client.close();
        }
        throw error;
    }
}


export { connectToDatabase };