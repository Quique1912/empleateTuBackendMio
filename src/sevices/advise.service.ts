// src/services/advise.service.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AdviseService {
  // Obtener todas las sugerencias
  static async getAllAdvises() {
    try {
      return await prisma.advise.findMany();
    } catch (error) {
      throw new Error('Error al obtener las sugerencias: ' + error);
    }
  }

  // Crear una nueva sugerencia
  static async createAdvise(name: string, email: string, message: string) {
    try {
      return await prisma.advise.create({
        data: {
          name,
          email,
          message,
        },
      });
    } catch (error) {
      throw new Error('Error al crear la sugerencia: ' + error);
    }
  }
}
