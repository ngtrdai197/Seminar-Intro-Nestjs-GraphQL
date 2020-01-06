import { createParamDecorator } from '@nestjs/common'

export const CurrentUser = createParamDecorator((data: string, req) => {
  return req && req.user
})
