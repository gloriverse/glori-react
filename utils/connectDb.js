import mongoose from 'mongoose'
const connection = {}

async function connectDB() {
    if (connection.isConnected) {
        //Use existing database connection
        console.log("Using existing connection")
        return;
    }
    //use a new database connection
    const db = await mongoose.connect(process.env.MONGO_SRV, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected")
}


export default connectDB;