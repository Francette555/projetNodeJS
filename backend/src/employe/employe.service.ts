import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employe } from './employe.entity';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';

@Injectable()
export class EmployeService {
  constructor(
    @InjectRepository(Employe)
    private employeRepository: Repository<Employe>,
  ) {}

  async create(createEmployeDto: CreateEmployeDto): Promise<Employe> {
    const employe = this.employeRepository.create(createEmployeDto);
    return await this.employeRepository.save(employe);
  }

  async findAll(): Promise<Employe[]> {
    return await this.employeRepository.find();
  }

  async findOne(numEmp: number): Promise<Employe> {
    const employe = await this.employeRepository.findOne({ where: { numEmp } });
    if (!employe) {
      throw new NotFoundException(`Employé avec ID ${numEmp} non trouvé`);
    }
    return employe;
  }

  async update(numEmp: number, updateEmployeDto: UpdateEmployeDto): Promise<Employe> {
    const employe = await this.findOne(numEmp);
    Object.assign(employe, updateEmployeDto);
    return await this.employeRepository.save(employe);
  }

  async remove(numEmp: number): Promise<void> {
    const result = await this.employeRepository.delete(numEmp);
    if (result.affected === 0) {
      throw new NotFoundException(`Employé avec ID ${numEmp} non trouvé`);
    }
  }

  async getBilan() {
    const employes = await this.findAll();
    if (employes.length === 0) {
      return { total: 0, min: 0, max: 0, count: 0 };
    }
    const salaires = employes.map(e => Number(e.salaire));
    return {
      total: salaires.reduce((a, b) => a + b, 0),
      min: Math.min(...salaires),
      max: Math.max(...salaires),
      count: employes.length,
    };
  }
}