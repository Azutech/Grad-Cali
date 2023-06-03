import { Router } from 'express'
import {
    oneBooking,
    createMovies,
    bookies,
    allMovies,
} from '../controllers/cinema'

export const cinema = Router()

cinema.get('/oneMovie/:id', oneBooking)
cinema.get('/allmovies', allMovies)
cinema.post('/newMovies/', createMovies)
cinema.post('/booking/:id', bookies)
