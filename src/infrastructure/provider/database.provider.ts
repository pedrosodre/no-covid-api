import mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> => {
            return mongoose.connect(
                `${process.env.MONGODB_URL}${process.env.DB_NAME}?authSource=admin&w=1`,
                { useNewUrlParser: true, bufferCommands: false, bufferMaxEntries: 0, useUnifiedTopology: true, useCreateIndex: true },
            );
        }
    },
];