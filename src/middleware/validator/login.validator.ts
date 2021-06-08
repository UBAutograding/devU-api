import { Request, Response, NextFunction } from 'express'

import ProviderService from '../../services/provider.service'

import { NotFound } from '../../utils/apiResponse.utils'

export function checkEnabledProviders(req: Request, res: Response, next: NextFunction) {
  const providerEnabled = ProviderService.validate(req.originalUrl)

  if (!providerEnabled) return res.status(404).json(NotFound)

  next()
}
