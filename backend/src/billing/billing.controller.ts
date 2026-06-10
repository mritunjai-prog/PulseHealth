import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('invoice')
  createInvoice(@Body() data: any) {
    return this.billingService.createInvoice(data);
  }

  @Get('invoices/:patientId')
  getInvoices(@Param('patientId') patientId: string) {
    return this.billingService.getInvoices(patientId);
  }
}
