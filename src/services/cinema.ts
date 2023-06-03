import { NextFunction, Request, Response } from 'express'
import { Ticket } from '../models/ticket'
import { Cinema } from '../models/cinema'
import { Semaphore } from '../utils/semaphore'
import AppError from '../utils/error'

const semaphore = new Semaphore(100)

export const allMovieService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const tickets = req.query.category
            ? { category: req.query.category }
            : {}

        const search = req.query.search
            ? {
                  name: {
                      $regex: req.query.regex,
                      options: 'i',
                  },
              }
            : {}

        const allticket = await Cinema.find({ ...tickets, ...search })
        if (!allticket)
            return next(new AppError('Unable to retrieve data', 404))

        return allticket
    } catch (err: any) {
        console.error(err)
        return next(new AppError(`Server Error ${err.message}`, 503))
    }
}

export const oneMovieService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params

    try {
        const booking = await Cinema.findOne({ _id: id })
        if (!booking) {
            return next(new AppError('Unable to retrieve data', 404))
        }

        return booking
    } catch (err: any) {
        console.error(err)
        return next(new AppError(`Server Error ${err.message}`, 503))
    }
}

export const createCinemaService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { movie, ticketPrice } = req.body

    try {
        const newMovie = await Cinema.findOne({ movie: movie })
        if (newMovie) {
            return next(new AppError('Movie already added', 404))
        }

        const addMovie = await Cinema.create({
            movie,
            ticketPrice,
        })
        return addMovie
    } catch (err: any) {
        console.error(err)
        return next(new AppError(`Server Error ${err.message}`, 503))
    }
}
