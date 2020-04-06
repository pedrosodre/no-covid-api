import { Schema } from 'mongoose';

export const NewsSchema = new Schema({
    id: { type: String, required: true, unique: true, trim: true },
    routineIdentifier: { type: String, required: true, trim: true, index: true },
    country: { type: String, required: true, trim: true },
    countryCode: { type: String, required: true, trim: true },
    source: { type: String, required: true, trim: true },
    author: { type: String, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    publishedAt: { type: Date },
}, { timestamps: true });