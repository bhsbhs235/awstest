import mongoose, { Document, Schema, model } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

export interface Board {
    num?: number;
    userId?: string,
    title: string,
    content: string,
    imageFile: string,
    date?: Date,
    count?: number,
}

const schema = new Schema({
    num: {type: Number, required: true, unique: true, index: true},
    userId: {type: String, required: true, index: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    imageFile: {type: String, required: false},
    date: {type: Date, required: true},
    count: {type: Number, required: true},
})

autoIncrement.initialize(mongoose.connection);
schema.plugin(autoIncrement.plugin, {
    model: 'Board',
    field: 'num',
    startAt: 1, //시작.
    increment: 1, //증가.
})

export const BoardModel = model<Board & Document>('Board', schema);