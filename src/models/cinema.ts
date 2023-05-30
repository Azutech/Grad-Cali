import {model, Schema} from 'mongoose'


const cinemaSchema = new Schema(
    {

    },
    {timestamps: true}
)
export const Cinema = model('cinema', cinemaSchema)