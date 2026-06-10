import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HospitalService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.hospital.create({ data });
  }

  async findAll() {
    return this.prisma.hospital.findMany({
      include: {
        _count: {
          select: { users: true, patients: true }
        }
      }
    });
  }

  async remove(id: string) {
    await this.prisma.$transaction([
      this.prisma.labResult.deleteMany({ where: { order: { patient: { hospitalId: id } } } }),
      this.prisma.labOrder.deleteMany({ where: { patient: { hospitalId: id } } }),
      this.prisma.prescription.deleteMany({ where: { patient: { hospitalId: id } } }),
      this.prisma.invoice.deleteMany({ where: { patient: { hospitalId: id } } }),
      this.prisma.appointments.deleteMany({ where: { hospitalId: id } }),
      this.prisma.medicalRecord.deleteMany({ where: { patient: { hospitalId: id } } }),
      this.prisma.patient.deleteMany({ where: { hospitalId: id } }),
      this.prisma.user.deleteMany({ where: { hospitalId: id } }),
      this.prisma.department.deleteMany({ where: { hospitalId: id } }),
      this.prisma.hospital.delete({ where: { id } })
    ]);
    return { success: true };
  }
}
