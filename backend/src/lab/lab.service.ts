import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LabService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: any) {
    return this.prisma.labOrder.create({ data });
  }

  async getOrders(patientId: string) {
    return this.prisma.labOrder.findMany({
      where: { patientId },
      include: { results: true, doctor: { select: { username: true, role: true } } }
    });
  }

  async addResult(orderId: string, data: any) {
    return this.prisma.labResult.create({
      data: {
        orderId,
        data: data.results,
        flags: data.flags,
        technicianId: data.technicianId
      }
    });
  }
}
