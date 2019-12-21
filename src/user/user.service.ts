import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IUser } from './interface/user.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { EditUser } from './user.entity'
import { USER_MODEL } from '../constants'

@Injectable()
export class UserService {
  constructor(
    // @Inject(USER_MODEL) private readonly userModel: Model<IUser>
    @InjectModel(USER_MODEL) private readonly userModel: Model<IUser>,
  ) {}

  async createUser(newUser: CreateUserDto): Promise<IUser> {
    const user = new this.userModel(newUser)
    return await user.save()
  }

  async findOne(conditions: { [key: string]: any }): Promise<IUser> {
    return await this.userModel.findOne(conditions)
  }

  async editUser(userId: string, editUser: EditUser): Promise<IUser> {
    const user = await this.userModel.findById(userId)
    if (!user) {
      throw new HttpException(
        { statusCode: 404, message: 'User not found' },
        HttpStatus.NOT_FOUND,
      )
    }
    user.set(editUser)
    return await user.save()
  }

  async fetchUsers(): Promise<IUser[]> {
    return await this.userModel.find()
  }

  async findById(id: string): Promise<IUser> {
    return await this.userModel.findById(id)
  }
}
