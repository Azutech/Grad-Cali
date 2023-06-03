import { NextFunction, Request, Response } from 'express'
import { Ticket } from '../models/ticket'
import { Cinema } from '../models/cinema'
import { Semaphore } from '../utils/semaphore'
import AppError from '../utils/error'

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
    const { name, movie, ticketPrice } = req.body

    try {
        if (!name || !movie || !ticketPrice) {
            return next(new AppError('Invalid Parameters', 404))
        }
        const newMovie = await Cinema.findOne({ movie: movie })
        if (newMovie) {
            return next(new AppError('Movie already added', 404))
        }

        const addMovie = await Cinema.create({
            name,
            movie,
            ticketPrice,
        })

        return addMovie
    } catch (err: any) {
        console.error(err)
        return next(new AppError(`Server Error ${err.message}`, 503))
    }
}

export const bookingService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { cinemaId } = req.params
        const { name, seats } = req.body

        if (!name || !seats) {
            return res.status(400).json({ message: 'Invalid input' })
        }

        console.log(2)

        const foundCinema = await Cinema.findById(cinemaId)
        if (!foundCinema) {
            return next(
                new AppError(`Cinema with this id ${cinemaId} not found`, 404)
            )
        }

        console.log(3)

        const semaphore = new Semaphore(foundCinema.availableSeats)

        semaphore.acquire()

        if (seats > foundCinema.availableSeats) {
            return next(new AppError('Not enough seats available', 404))
        } else {
            await Cinema.findOneAndUpdate(
                { _id: cinemaId },
                { $inc: { availableSeats: -seats } }
            )
            await foundCinema.save()
        }

        const customer = new Ticket({
            customerName: name,
            bookedSeats: seats,
        })
        await customer.save()

        semaphore.release()
    } catch (err: any) {
        console.error(err)
        return next(new AppError(`Server Error ${err.message}`, 503))
    }
}
