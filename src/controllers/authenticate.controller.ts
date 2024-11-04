import { Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

// const authenticateBodySchema = z.object({
//   email: z.string().email(),
//   password: z.string(),
// })

// type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  // @HttpCode(200)
  // @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle() {
    const token = this.jwt.sign({
      sub: 'user-id',
    })

    return token
  }
}
