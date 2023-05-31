import { model, Schema } from 'mongoose'

const cinemaSchema = new Schema(
    {
        movie: {
            type: String,
            required: [true, 'movie is required'],
        },
        capacity: {
            type: Number,
        },

        availableSeats: {
            type: Number,
        },
    },
    { timestamps: true }
)
export const Cinema = model('cinema', cinemaSchema)
