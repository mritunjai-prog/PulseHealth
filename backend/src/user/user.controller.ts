import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}
  
  @Post() 
  create(@Body() data: any) { return this.service.create(data); }
  
  @Get() 
  findAll() { return this.service.findAll(); }
  
  @Delete(':id') 
  remove(@Param('id') id: string) { return this.service.remove(id); }
}
