import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import type { JwtPayload } from './interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginInput: LoginInput) {
    const user = await this.authService.validateUser(loginInput.name);
    if (!user) {
      throw new Error('User not found');
    }
    return this.authService.login(user);
  }

  @Get('whoami')
  @UseGuards(JwtAuthGuard)
  whoAmI(@CurrentUser() user: JwtPayload) {
    return `Your user ID is ${user.userId}, your role is ${user.role} and you are in ${user.country}`;
  }
}
