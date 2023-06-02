import { model, Schema, Types } from 'mongoose'
import { Customer } from './customers'
import { Cinema } from './cinema'

const ticketSchema = new Schema(
    {
        customerId: {
            type: Types.ObjectId,
            required: true,
            ref: Customer,
        },

        cinema: {
            type: Types.ObjectId,
            required: true,
            ref: Cinema,
        },

        seat: {
            type: Number,
        },
    },
    { timestamps: true }
)

export const Ticket = model('ticket', ticketSchema)
