import { model, Schema } from 'mongoose'

const cinemaSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        movie: {
            type: String,
            required: [true, 'movie is required'],
        },
        ticketPrice: {
            type: Number,
            required: true,
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
