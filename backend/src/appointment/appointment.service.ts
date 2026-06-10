import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.appointments.create({
      data: {
        hospitalId: data.hospitalId,
        patientId: data.patientId,
        doctorId: data.doctorId,
        departmentId: data.departmentId,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        status: 'SCHEDULED',
        visitType: data.visitType,
        source: data.source
      }
    });
  }

  async findAll(hospitalId: string, doctorId?: string) {
    const where: any = { hospitalId };
    if (doctorId) where.doctorId = doctorId;

    return this.prisma.appointments.findMany({
      where,
      include: {
        patient: true,
        doctor: { select: { id: true, username: true, role: true } }
      },
      orderBy: { startTime: 'asc' }
    });
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointments.findUnique({
      where: { id },
      include: { patient: true }
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.appointments.update({
      where: { id },
      data: { status }
    });
  }
}
