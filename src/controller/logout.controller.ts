import { Request, Response, NextFunction} from 'express'

export async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        res.clearCookie('refreshToken')
        res.status(200).send()
    } catch (err) {
        next(err)
    }
}

export default logout