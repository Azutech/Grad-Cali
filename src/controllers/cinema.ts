import { NextFunction, Request, Response } from 'express'
import {
    oneMovieService,
    createCinemaService,
    allMovieService,
    bookingService,
} from '../services/cinema'

export const oneBooking = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const getOneBooking = await oneMovieService(req, res, next)

    return res.status(200).json({
        message: 'data been retrieved successfully',
        data: getOneBooking,
    })
}

export const createMovies = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const newMovie = await createCinemaService(req, res, next)

    return res.status(200).json({
        message: 'new movie added ',
        data: newMovie,
    })
}
export const allMovies = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const allMovies = await allMovieService(req, res, next)

    return res.status(200).json({
        message: 'all movies has been retrieved',
        data: allMovies,
    })
}

export const bookies = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const booked = await bookingService(req, res, next)

    return res.status(200).json({
        message: 'Movie ticket booked succesfully',

        data: booked,
    })
}
