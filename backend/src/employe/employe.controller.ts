import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('employees')
@UseGuards(JwtAuthGuard)  // Protection de toutes les routes
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}

  @Post()
  async create(@Body() createEmployeDto: CreateEmployeDto) {
    await this.employeService.create(createEmployeDto);
    return { message: 'insertion réussie' };
  }

  @Get()
  findAll() {
    return this.employeService.findAll();
  }

  @Get('bilan')
  async getBilan() {
    return this.employeService.getBilan();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEmployeDto: UpdateEmployeDto) {
    await this.employeService.update(+id, updateEmployeDto);
    return { message: 'modification réussie' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.employeService.remove(+id);
    return { message: 'suppression réussie' };
  }
}