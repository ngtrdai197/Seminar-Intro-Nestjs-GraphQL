import { Model, Document } from 'mongoose'

export abstract class BaseService<T extends Document> {
  NOT_FOUND_ERROR = 'Record does not exists'
  constructor(protected readonly model: Model<T, {}>) {}

  async create(doc: { [key: string]: any }): Promise<T> {
    return this.model.create(doc)
  }

  async updateMany(
    conditions: { [key: string]: any },
    doc: { [key: string]: any },
    options: { [key: string]: any },
  ): Promise<T[]> {
    return this.model.updateMany(conditions, doc, options)
  }

  async findOneAndUpdate(
    conditions: { [key: string]: any },
    doc: { [key: string]: any },
    options: { [key: string]: any },
  ): Promise<T> {
    return this.model.findOneAndUpdate(conditions, doc, options)
  }

  async findByIdAndUpdate(
    id: string,
    doc: { [key: string]: any },
    options?: { [key: string]: any },
  ): Promise<T> {
    return this.model.findByIdAndUpdate(id, doc, options)
  }

  async countDocuments(criteria: { [key: string]: any }) {
    return this.model.countDocuments(criteria)
  }

  async find(conditions?: { [key: string]: any }): Promise<T[]> {
    conditions = conditions ?? {}
    return this.model.find(conditions)
  }

  async findOne(conditions: { [key: string]: any }): Promise<T> {
    return this.model.findOne(conditions)
  }

  async delete(conditions: { [key: string]: any }): Promise<boolean> {
    const result = await this.model.deleteOne(conditions)
    return result.ok === 1 ? true : false
  }

  async deleteMany(conditions: { [key: string]: any }): Promise<boolean> {
    const result = await this.model.deleteMany(conditions)
    return result.ok === 1 ? true : false
  }
}