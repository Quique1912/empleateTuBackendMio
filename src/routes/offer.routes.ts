import { OfferController } from "../controllers/offer.controller";
import { Router } from "express";
import { isAuthenticate } from "../middlewares/auth.middleware";

const router = Router()

//Get Listar todas las ofertas localhost:3000/api/offerts/?tittle=react&category=dam
router.get('/', OfferController.getAll)
router.get('/:id', OfferController.getById)
// POST añadir una oferta nueva localhost:3000/api/offerts/ {body}
router.post('/', isAuthenticate, OfferController.create)
//Delete Borrar una oferta localhost:3000/api/offerts/xxxx
router.post('/:id', isAuthenticate, OfferController.delete)
//PUT modificar una oferta localhost:3000/api/offerts/xxxx {body}
router.put('/:id', isAuthenticate, OfferController.update)


// calificamos una oferta x
router.post('/:id/rate/', isAuthenticate, OfferController.rate)
//Vemos que calificacion (total) se le ha dado a una oferta
router.get('/:id/rate/', isAuthenticate, OfferController.getRate)

export default router