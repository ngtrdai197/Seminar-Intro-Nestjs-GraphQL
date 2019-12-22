import { Injectable } from '@nestjs/common'
import * as Joi from '@hapi/joi'
import * as dotenv from 'dotenv'
import * as fs from 'fs'

export interface EnvConfig {
  [key: string]: string
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath))
    this.envConfig = this.validateInput(config)
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production')
        .default('development'),
      PORT: Joi.number().default(3000),
      DATABASE_NAME: Joi.string().required(),
    })
    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    )
    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }
    return validatedEnvConfig
  }

  get(key: string): string {
    return this.envConfig[key]
  }

  get port(): number {
    return +this.envConfig.PORT
  }
  get uriConnectDB(): string {
    return `mongodb://localhost/${this.envConfig.DATABASE_NAME}`
  }
}
