import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input.dto';
import { LoginDto } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import type { User } from '@prisma/client';
import type { JwtPayload } from './interfaces/jwt-payload.interface';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginDto)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.validateUser(loginInput.name);
    if (!user) {
      throw new Error('User not found');
    }
    return this.authService.login(user);
  }

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  whoAmI(@CurrentUser() user: JwtPayload) {
    return `Your user ID is ${user.userId}, your role is ${user.role} and you are in ${user.country}`;
  }
}
