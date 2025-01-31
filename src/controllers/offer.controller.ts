import { OfferService } from "../sevices/offer.service";
import express, {Response, Request, NextFunction} from 'express'

export class OfferController{
    static async getById(req:Request, res:Response, next:NextFunction){
        try{
            const id = req.params.id
            const offer = await OfferService.getById(id)
            res.status(200).json(offer)
        }catch(error){
            next(error)
        }
}

static async getAll(req:Request, res:Response, next:NextFunction){
    try{
        const offer = await OfferService.getAll()
        res.status(200).json(offer)
    }catch(error){
        next(error)
    }
}

static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newOffer = await OfferService.create()
      res.status(201).json(newOffer)
    } catch (error) {
      next(error)
    }
  }

static async delete(req: Request, res:Response, next: NextFunction){
    try{
        const deleteOffer = await OfferService.delete()
        res.status(201).json(deleteOffer)
    }catch(error){
        next(error)
    }

}

static async update(req: Request, res:Response, next: NextFunction){
    try{
        const updatedOffer = await OfferService.update()
        res.status(201).json(updatedOffer)
    }catch(error){
        next(error)
    }
    
}

static async rate(req: Request, res:Response, next: NextFunction){
    try{
        const newRate = await OfferService.rate()
        res.status(201).json(newRate)
    }catch(error){
        next(error)
    }
    
}

static async getRate(req: Request, res:Response, next: NextFunction){
    try{
        const gettedRate = await OfferService.getRate()
        res.status(201).json(gettedRate)
    }catch(error){
        next(error)
    }
    
}
}