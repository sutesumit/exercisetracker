import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const connectDB  = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Server connected to the database on ${conn.connection.host}`)
    } catch (error){
        console.log(`Failed to connect to the databse: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB