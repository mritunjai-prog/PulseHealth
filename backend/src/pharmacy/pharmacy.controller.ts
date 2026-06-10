import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';

@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Get('inventory/:hospitalId')
  getInventory(@Param('hospitalId') hospitalId: string) {
    return this.pharmacyService.getInventory(hospitalId);
  }

  @Post('prescription')
  createPrescription(@Body() data: any) {
    return this.pharmacyService.createPrescription(data);
  }

  @Get('prescriptions/:patientId')
  getPrescriptions(@Param('patientId') patientId: string) {
    return this.pharmacyService.getPrescriptions(patientId);
  }
}
