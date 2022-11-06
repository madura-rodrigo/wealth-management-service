import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Investment } from '../model/investment.model';
import { CreateInvestmentDto } from './dto/create-investment.dto';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectModel(Investment.name)
    private readonly investmentModel: Model<Investment>,
  ) {}

  async add(createInvestmentDto: CreateInvestmentDto): Promise<Investment> {
    const createdInvestment = await this.investmentModel.create(
      createInvestmentDto,
    );
    return createdInvestment;
  }

  async get(): Promise<Investment[]> {
    return await this.investmentModel.find().exec();
  }

  async update() {}

  async delete() {}
}
