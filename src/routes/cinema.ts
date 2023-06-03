import { Router } from 'express'
import { oneBooking, createMovies } from '../controllers/cinema'

export const cinema = Router()

cinema.get('/oneMovie/:id', oneBooking)
cinema.post('/newMovies/', createMovies)
