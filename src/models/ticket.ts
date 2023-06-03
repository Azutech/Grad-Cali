import { model, Schema, Types } from 'mongoose'
import { Cinema } from './cinema'

const ticketSchema = new Schema(
    {
        customerName: {
            type: String,
        },

        cinema: {
            type: Types.ObjectId,
            required: true,
            ref: Cinema,
        },

        seat: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
)

export const Ticket = model('ticket', ticketSchema)
