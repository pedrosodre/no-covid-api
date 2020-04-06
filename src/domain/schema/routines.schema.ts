import { Schema } from 'mongoose';

export const RoutinesSchema = new Schema({
    id: { type: String, required: true, unique: true, trim: true },
    type: { type: String, required: true, trim: true, enum: ['cities', 'states', 'countries', 'news', 'good-news'] },
}, { timestamps: true });