import { AdviseService } from "@/sevices/advise.service";
import { Request, Response } from "express";
 // Asegúrate de que tengas el servicio de sugerencias.

export class AdviseController {

  // Método para obtener todas las sugerencias
  static async getAll(req: Request, res: Response) {
    try {
      const advises = await AdviseService.getAllAdvises();
      res.json(advises);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las sugerencias." });
    }
  }

  // Método para crear una nueva sugerencia
  static async create(req: Request, res: Response) {
    try {
      const { content, userId, message } = req.body;
      const newAdvise = await AdviseService.createAdvise(content, userId, message);
      res.status(201).json(newAdvise);
    } catch (error) {
      res.status(500).json({ message: "Error al crear la sugerencia." });
    }
  }
}
