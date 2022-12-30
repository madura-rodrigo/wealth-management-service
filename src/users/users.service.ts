import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel
      .findOne({ email: email })
      .select('-password')
      .exec();
  }

  async create(createUserDto: CreateUserDto) {
    try {
      await this.userModel.create(createUserDto);
    } catch (e) {
      if (11000 === e.code) {
        //e-mail id already exisits in DB
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid e-mail.',
        });
      }
      throw e;
    }
  }
}
