import { Document, Schema, model } from 'mongoose';

export interface User {
    email: string;
    name: string;
    password: string;
    adminlevel: number;
}

const schema = new Schema({
    email: {type: String, required: true, unique: true, index: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    adminlevel: {type: Number, required: true}
})

export const UserModel = model<User & Document>('User', schema);