import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { HospitalService } from './hospital.service';

@Controller('hospital')
export class HospitalController {
  constructor(private readonly service: HospitalService) {}
  
  @Post() 
  create(@Body() data: any) { return this.service.create(data); }
  
  @Get() 
  findAll() { return this.service.findAll(); }
  
  @Delete(':id') 
  remove(@Param('id') id: string) { return this.service.remove(id); }
}
