import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PharmacyService {
  constructor(private prisma: PrismaService) {}

  async getInventory(hospitalId: string) {
    return this.prisma.pharmacyInventory.findMany({ where: { hospitalId } });
  }

  async createPrescription(data: any) {
    return this.prisma.prescription.create({ data });
  }

  async getPrescriptions(patientId: string) {
    return this.prisma.prescription.findMany({
      where: { patientId },
      include: { doctor: { select: { username: true, role: true } } }
    });
  }
}
