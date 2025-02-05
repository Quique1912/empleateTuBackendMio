import { HTTPException } from "../exceptions/httpException";
import { Offer, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient()

export class OfferService{

    static async getById(id:number){
        const findOffer = await prisma.offer.findUnique({where: {id}})
        if(!findOffer) throw new HTTPException(404,'User not found')
            return findOffer
    }
// localhost:3000/api/offer/?
    static async getAll(title: string= ''){
        const findOffers = await prisma.offer.findMany({
            where: title ? {
                title:{
                    contains: title
                }
            } : {},
            orderBy:{
                createdAt: 'desc'
            },
            take: 100
        })
        return findOffers
    }

    static async create(offer : Offer, userId: number) { 
        const createOffers = await prisma.offer.create({
            data: {
            ...offer,
            idUserCreator: userId
            }
        })
        
        return createOffers
    }

    static async delete(id: number) { 
        return await prisma.offer.delete({
            where: {id}
        })
        

    }

    static async update(id: number, offer: Offer) { 
        return await prisma.offer.update({
            where: {id},
            data: {
                ...offer,
            }
        })

        

    }

    static async rate(id: number, userId: number,  rate: number) { 

        

    }

    static async getRate(idOffer: number) { 

        const ratingStats= await prisma.rate.aggregate({
            where:{idOffer},
            _avg: {value:true},
            _count: {value: true}

        })

        return {
            totalRatings: ratingStats._count.value,
            averateRatings: ratingStats._avg.value?.toFixed(2),

        }

        

    }

    static async getMyRate(idUser: number, idOffer: number){
        const findOffer = await prisma.offer.findUnique({where: {id:idOffer}})
        if(!findOffer) throw new HTTPException(404, 'Offer do not exists')

            return await prisma.rate.findUnique({
                where:{
                    idUser_idOffer:{idUser, idOffer}
                }
            })
    }

    


      
}