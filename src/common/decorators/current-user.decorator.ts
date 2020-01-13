import { createParamDecorator } from '@nestjs/common'

export const CurrentUser = createParamDecorator((data: string, req) => {
  return data ? req.user && req.user[data] : req.user
})

export const GqlUser = createParamDecorator((data, [root, args, ctx, info]) => {
  return ctx.req.user
})
