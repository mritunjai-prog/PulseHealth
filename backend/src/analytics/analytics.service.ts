import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getPlatformKpis() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [hospitals, patients, staff, appointmentsToday] = await Promise.all([
      this.prisma.hospital.count(),
      this.prisma.patient.count(),
      this.prisma.user.count(),
      this.prisma.appointments.count({
        where: {
          startTime: { gte: today }
        }
      })
    ]);

    const invoices = await this.prisma.invoice.aggregate({
      _sum: { amount: true },
      where: { createdAt: { gte: today } }
    });

    return {
      hospitals,
      patients,
      staff,
      appointmentsToday,
      revenueToday: invoices._sum.amount || 0
    };
  }

  async getHospitalDistribution() {
    return this.prisma.appointments.groupBy({
      by: ['hospitalId'],
      _count: true
    });
  }
}
