import { model, Schema } from 'mongoose'

const cinemaSchema = new Schema(
    {
        name: {
            type: String,
        },
        movie: {
            type: String,
        },
        ticketPrice: {
            type: Number,
        },
        capacity: {
            type: Number,
            default: 100,
        },

        availableSeats: {
            type: Number,
            default: 100,
        },
    },
    { timestamps: true }
)
export const Cinema = model('cinema', cinemaSchema)
