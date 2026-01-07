import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string): Promise<any> {
    const user = await this.usersService.findByName(name);
    if (user) {
      // In a real app, you'd also check the password
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { userId: user.id, role: user.role, country: user.country };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
