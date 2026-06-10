import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const passwordHash = await bcrypt.hash(data.password || 'password123', 10);
    return this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash,
        role: data.role,
        hospitalId: data.hospitalId,
      }
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        hospital: { select: { name: true } }
      }
    });
  }

  async remove(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { status: 'INACTIVE' }
    });
  }
}
