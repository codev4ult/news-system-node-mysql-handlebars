import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["0", "1"],
            default: "1",
        },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);

export default mongoose.model("Category", categorySchema);
