import { Schema } from 'mongoose';

export const CasesSchema = new Schema({
    id: { type: String, required: true, trim: true },
    routineIdentifier: { type: String, required: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    nativeName: { type: String, required: false, trim: true },
    type: { type: String, required: true, trim: true, index: true },
    parent: { type: String, required: false, trim: true },
    majorParent: { type: String, required: false, trim: true },
    created: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    confirmedCases: { type: Number },
    deaths: { type: Number },
    recovered: { type: Number },
    latitude: { type: String, trim: true },
    longitude: { type: String, trim: true },
}, { timestamps: false });
