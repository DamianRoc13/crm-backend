import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  create(createLeadDto: CreateLeadDto) {
    const lead = this.leadRepository.create(createLeadDto);
    return this.leadRepository.save(lead);
  }

  findAll() {
    return this.leadRepository.find({
      relations: ['activities'],
    });
  }

  async findOne(id: number) {
    const lead = await this.leadRepository.findOne({
      where: { id },
      relations: ['activities'],
    });
    if (!lead) {
      throw new NotFoundException(`Lead #${id} not found`);
    }
    return lead;
  }

  async update(id: number, updateLeadDto: UpdateLeadDto) {
    const lead = await this.findOne(id);
    this.leadRepository.merge(lead, updateLeadDto);
    return this.leadRepository.save(lead);
  }

  async remove(id: number) {
    const lead = await this.findOne(id);
    return this.leadRepository.remove(lead);
  }

  async getLeadActivities(id: number) {
    const lead = await this.findOne(id);
    return lead.activities;
  }

  async setStatus(id: number, status: string) {
    const lead = await this.findOne(id);
    lead.status = status;
    return this.leadRepository.save(lead);
  }
}