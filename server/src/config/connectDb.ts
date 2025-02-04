import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        // await mongoose.connect("mongodb+srv://ahmad:ahmad123@cluster0.bnpif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
};
