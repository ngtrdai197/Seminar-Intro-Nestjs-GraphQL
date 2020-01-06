import { SetMetadata } from '@nestjs/common'

export const Roles = (...roles: string[]) => {
  const metadata = SetMetadata('roles', roles)
  console.log('metadata', metadata)
  return metadata
}
