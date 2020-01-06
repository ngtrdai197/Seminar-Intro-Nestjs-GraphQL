import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IUser } from './interface/user.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { USER_MODEL } from '../constants'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<IUser>,
  ) {}

  async createUser(newUser: CreateUserDto): Promise<IUser> {
    return await this.userModel.create(newUser)
  }

  async findOne(conditions: { [key: string]: any }): Promise<IUser> {
    return await this.userModel.findOne(conditions)
  }

  async update(id: string, docs: { [key: string]: any }): Promise<IUser> {
    const user = await this.userModel.findByIdAndUpdate(id, docs, {
      new: true,
    })
    if (!user) {
      throw new HttpException(
        { statusCode: 404, message: 'User not found' },
        HttpStatus.NOT_FOUND,
      )
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
