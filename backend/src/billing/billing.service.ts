import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  async createInvoice(data: any) {
    return this.prisma.invoice.create({ data });
  }

  async getInvoices(patientId: string) {
    return this.prisma.invoice.findMany({
      where: { patientId },
      include: { claims: true }
    });
  }
}
