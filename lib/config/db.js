import mongoose from "mongoose";
export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log("Database Connected");
        });
    } catch (error) {
        console.log("Error Occured while connecting Database", error);
    }
};
