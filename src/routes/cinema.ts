import { Router } from 'express'

import {
    bookingService,
    oneMovieService,
    allMovieService,
    createCinemaService,
} from '../services/cinema'

export const cinema = Router()

cinema.get('/oneMovie/:id', oneMovieService)
cinema.get('/allmovies', allMovieService)
cinema.post('/newMovies/', createCinemaService)
cinema.post('/booking/:cinemaId', bookingService)
