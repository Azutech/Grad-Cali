import { timeStamp } from 'console'
import { model, Schema } from 'mongoose'

const customerSchema = new Schema(
    {
        fullname: {
            type: String,
            required: [true, 'fullname is required'],
        },
        phoneNumber: {
            type: Number,
            required: [true, 'fullname is required'],
        },

        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
        },
    },
    { timestamps: true }
)
