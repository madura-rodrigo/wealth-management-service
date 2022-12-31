import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Divident } from '../model/divident.model';
import { CreateDividentDto } from './dto/create-divident.dto';

@Injectable()
export class DividentService {
  constructor(
    @InjectModel(Divident.name)
    private readonly dividientModel: Model<Divident>,
  ) {}

  async add(createDividentDto: CreateDividentDto): Promise<Divident> {
    const createdDvident = await this.dividientModel.create(createDividentDto);
    return createdDvident;
  }

  async get(userId: string): Promise<Divident[]> {
    return this.dividientModel.find({ userId }).exec();
  }

  async update() {
    console.log('Update');
  }

  async delete() {
    console.log('Delete');
  }
}
