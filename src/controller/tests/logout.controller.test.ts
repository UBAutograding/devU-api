import Logout from '../logout.controller'

import Testing from '../../utils/testing.utils'

// Testing Globals
let req: any
let res: any
let next: any

describe('Logout', () => {
    beforeEach(() => {
        req = Testing.fakeRequest()
        res = Testing.fakeResponse()
        next = Testing.fakeNext()
    })

    describe('GET - /logout', () => {
        describe('200 - Ok', () => {
            beforeEach(async () => {
                await Logout(req,res,next) // testing logout
            })
            test('Status code is 200', () => expect(res.status).toHaveBeenCalledWith(200))

        })
    })
})