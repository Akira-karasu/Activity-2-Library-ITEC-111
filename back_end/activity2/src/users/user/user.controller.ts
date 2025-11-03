import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.user.dto';
import { RegisterDto } from '../user/dto/register.user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signIn')
  signIn(@Body() body: LoginDto) {
    return this.userService.signIn(body);
  }

  @Post('signUp')
  signUp(@Body() body: RegisterDto) {
    return this.userService.signUp(body);
  }

}
