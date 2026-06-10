import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, authorId: string) {
    return this.prisma.patient.create({
      data: {
        hospitalId: data.hospitalId,
        MRN: data.MRN,
        firstName: data.firstName,
        lastName: data.lastName,
        dob: new Date(data.dob),
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        address: data.address,
        identifiers: data.identifiers,
        consentFlags: data.consentFlags,
        createdByUserId: authorId
      }
    });
  }

  async findAll(hospitalId: string) {
    return this.prisma.patient.findMany({
      where: { hospitalId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        appointments: true,
        medicalRecords: true
      }
    });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async update(id: string, data: any) {
    return this.prisma.patient.update({
      where: { id },
      data
    });
  }

  async remove(id: string) {
    return this.prisma.patient.delete({
      where: { id }
    });
  }
}
