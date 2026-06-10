import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LabService } from './lab.service';

@Controller('lab')
export class LabController {
  constructor(private readonly labService: LabService) {}

  @Post('order')
  createOrder(@Body() data: any) {
    return this.labService.createOrder(data);
  }

  @Get('orders/:patientId')
  getOrders(@Param('patientId') patientId: string) {
    return this.labService.getOrders(patientId);
  }

  @Post('result/:orderId')
  addResult(@Param('orderId') orderId: string, @Body() data: any) {
    return this.labService.addResult(orderId, data);
  }
}
