import { Router } from 'express'
import { cinema } from './cinema'

export const routes = Router()

routes.use('/cinema', cinema)
