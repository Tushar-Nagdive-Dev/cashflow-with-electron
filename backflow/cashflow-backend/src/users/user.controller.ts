import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() data: Partial<User>) {
    return await this.userService.createUser(data);
  }

  @Post('login')
  async login(@Body() { email, password }: { email: string; password: string }) {
    const user = await this.userService.findUserByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    return { message: 'Login successful', user };
  }
}
