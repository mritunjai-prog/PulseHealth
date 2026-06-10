import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() data: any) {
    return this.appointmentService.create(data);
  }

  @Get('hospital/:hospitalId')
  findAll(
    @Param('hospitalId') hospitalId: string,
    @Query('doctorId') doctorId?: string
  ) {
    return this.appointmentService.findAll(hospitalId, doctorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.appointmentService.updateStatus(id, status);
  }
}
