import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IUser } from './interface/user.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { USER_MODEL } from '@/common/constants'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<IUser>,
  ) {}

  async findOne(conditions: { [key: string]: any }): Promise<IUser> {
    return await this.userModel.findOne(conditions)
  }

  async create(newUser: CreateUserDto): Promise<IUser> {
    return await this.userModel.create(newUser)
  }

  async update(id: string, docs: { [key: string]: any }): Promise<IUser> {
    const user = await this.userModel.findByIdAndUpdate(id, docs, {
      new: true,
    })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async fetchUsers(): Promise<IUser[]> {
    return await this.userModel.find()
  }

  async findById(id: string): Promise<IUser> {
    return await this.userModel.findById(id)
  }
}
