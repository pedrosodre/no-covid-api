import { Schema } from 'mongoose';

export const ApplicationSchema = new Schema({
    id: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    active: { type: Boolean, default: true },
    ip: { type: String, required: true, trim: true },
    key: { type: String, required: true, trim: true },
    secret: { type: String, required: true, trim: true },
    jwtBlacklist: [{ type: String, trim: true }],
    type: { type: String, required: true, trim: true, enum: ['client-side', 'server-side'] },
    requestOrigin: [{ type: String, required: true, trim: true }],
    rateLimit: { type: Number, default: 10 },
    ownerName: { type: String, required: true, trim: true },
    ownerEmail: { type: String, required: true, trim: true },
}, { timestamps: true });