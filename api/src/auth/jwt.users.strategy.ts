import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EntitiesService } from 'src/entities/entities.service';
import { Users } from 'src/entities/schemas/users';


@Injectable()
export class JwtUsersStrategy extends PassportStrategy(Strategy, 'jwtUsers') {
  constructor(
    private readonly configService: ConfigService<{ JWT_SECRET: string }, true>,
    private entitiesService: EntitiesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<any | undefined> {
    const user = await this.entitiesService.getRepository<Users>('Users').findOne({ where: { id: payload.userId } })
    if (!user) return undefined;

    const userPayload = { id: user.id, email: user.email, role: user.role, username: user.username, repliedAt: user.repliedAt };
    return userPayload;
  }
}
