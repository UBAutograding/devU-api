import { Request, Response, NextFunction } from 'express'
import { GenericResponse } from '../utils/apiResponse.utils'
import { refreshToken } from '../utils/cookie.utils'

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie(refreshToken).status(200).json(new GenericResponse('Logout Sucessful'))
  } catch (err) {
    next(err)
  }
}

export default logout
