import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EntitiesService } from 'src/entities/entities.service';


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
    console.log('JWT-payload', payload);

    const user = await this.entitiesService.getRepository('Users').findOne({ where: { id: payload.userId } })
    if (!user) return undefined;

    const userPayload = { id: user.id, email: user.email, role: user.role };
    console.log('userInRequest', userPayload)
    return userPayload;
  }
}
