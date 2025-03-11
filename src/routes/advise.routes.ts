import { Router } from "express";
import { AdviseController } from "../controllers/advise.controller";

const router = Router();

// Ruta para obtener todas las sugerencias
router.get("/advises", AdviseController.getAll);

// Ruta para crear una nueva sugerencia
router.post("/advises", AdviseController.create);

export default router;
