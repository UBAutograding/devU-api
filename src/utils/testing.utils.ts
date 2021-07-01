import { Request, Response, NextFunction, CookieOptions } from 'express'

import Models from '../model'

export function fakeRequest(overrides?: Partial<Request>): Request {
  const req = {} as Request

  req.params = {}
  req.body = {}
  req.headers = {}
  req.cookies = {}

  return { ...req, ...overrides } as Request
}

export function fakeResponse(overrides?: Partial<Response>): Response {
  const res = {} as Response

  res.status = jest.fn().mockImplementation((s: number) => res)
  res.json = jest.fn().mockImplementation((r: any) => res)
  res.send = jest.fn().mockImplementation(() => res)
  res.end = jest.fn().mockImplementation(() => res)
  res.cookie = jest.fn().mockImplementation((n: string, v: string, o: CookieOptions) => res)
  res.clearCookie = jest.fn().mockImplementation((name: string, options: CookieOptions) => res)
  res.redirect = jest.fn().mockImplementation(() => res)
  res.type = jest.fn().mockImplementation(() => res)
  res.setHeader = jest.fn().mockImplementation(() => res)

  return { ...res, ...overrides } as Response
}

export function fakeNext(): NextFunction {
  return jest.fn()
}

/**
 * Creates typeorm object and sets dates & id
 *
 * @param model - Models
 * @returns
 */
export function generateTypeOrm<ModelClass extends Models>(model: { new (): ModelClass }): ModelClass {
  const newModel = new model() as ModelClass

  newModel.id = 1
  newModel.createdAt = new Date()
  newModel.updatedAt = new Date()

  return newModel
}

/**
 * Generates a list of provided model (with correct dates)
 * It's attempting to get it as close to as if you queried the database for this data
 *
 * @param model - Any model from model/index.ts
 * @param count - how many you want
 * @returns Array of newly created models
 */
export function generateTypeOrmArray<ModelClass extends Models>(
  model: { new (): ModelClass },
  count: number
): ModelClass[] {
  const data: ModelClass[] = []

  for (let i = 0; i < count; i++) {
    const newObject = generateTypeOrm<ModelClass>(model)

    newObject.id = i + 1

    data.push(newObject)
  }

  return data as ModelClass[]
}

export default {
  fakeRequest,
  fakeResponse,
  fakeNext,

  generateTypeOrm,
  generateTypeOrmArray,
}
