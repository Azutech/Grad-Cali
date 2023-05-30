import supertest from 'supertest'
import server from '../server'

describe('Test for Express Server', () => {
    test('GET / returns 200 OK with correct message', async () => {
        const response = await supertest(server).get('/')

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: 'Welcome to Grand-Cali \n Best Movies to Watch ',
        })
    })
})
