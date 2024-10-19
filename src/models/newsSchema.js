import mongoose from "mongoose";

import Category from "./categorySchema.js";
import Author from "./authorSchema.js";

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category", // Referência ao modelo Category
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author", // Referência ao modelo Author
            required: true,
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["published", "draft", "archived"],
            default: "draft",
        },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);

export default mongoose.model("News", newsSchema);
