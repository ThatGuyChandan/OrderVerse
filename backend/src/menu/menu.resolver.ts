import { Resolver, Query } from '@nestjs/graphql';
import { MenuService } from './menu.service';
import { MenuItem } from './entities/menu-item.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Resolver(() => MenuItem)
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Query(() => [MenuItem], { name: 'menuItems' })
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: JwtPayload) {
    return this.menuService.findAll(user);
  }
}