import mongoose from "mongoose";
let isConnected = false;

export const dbConnect = async () =>{
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('MongoDB is already connected');
        return;
    }
    try {
        await mongoose.connect("mongodb+srv://abasskoyang12345:Koyang12@cluster0.ke9yfha.mongodb.net/?retryWrites=true&w=majority", {
            dbName: 'logo',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log('MongoDB connected')
    } catch (error) {
        console.log("Mongodb error message:", error)
    }
};