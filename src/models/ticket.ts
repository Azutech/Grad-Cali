import { model, Schema, Types } from 'mongoose'
import { Cinema } from './cinema'

const ticketSchema = new Schema(
    {
        customerName: {
            type: String,
        },

        bookedSeats: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
)

export const Ticket = model('ticket', ticketSchema)
