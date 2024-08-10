import { Body, Controller, Get, Param, ParseIntPipe, Patch } from "@nestjs/common";
import * as argon2 from "argon2";
import { Roles } from "src/auth/roles.decorator";
import { User } from "src/auth/user.decorator";
import { RolesEnum } from "src/entities/definitions";
import { EntitiesService } from "src/entities/entities.service";
import { Guests } from "src/entities/schemas/guests";
import { Users } from "src/entities/schemas/users";

@Controller('guests')
export class GuestsController {

    constructor(
        private readonly entityService: EntitiesService
    ) { }

    @Get()
    getGuests(@User() user: any) {
        console.log('getGuests', user);
        return this.entityService.getRepository('Users').findOne({
            where: { id: user.id },
            relations: ['guests']
        }).then(result => {
            console.log(result)
            return result
        });
    }

    @Patch()
    async patchGuests(@User() user: any, @Body() body: Users & { guests: Guests[] }) {
        console.log('-----', body.guests)
        await Promise.all(
            body.guests.map(guest => {
                if (!guest.reception) {
                    guest.dinner = false
                }
                return this.entityService.manager.update(Guests, { userId: user.id, id: guest.id }, guest)
            }
            )
        )
        await this.entityService.manager.update(Users, { id: user.id }, {
            ...(body.password ? {
                password: await argon2.hash(body.password, {
                    type: argon2.argon2id,
                })
            } : {}),
            ...(body.email ? { email: body.email } : {}),
            ...(body.phone ? { phone: body.phone } : {}),

            repliedAt: new Date()
        })

    }


    @Roles(RolesEnum.ADMIN)
    @Get('all')
    getAllGuests() {
        return this.entityService.manager.createQueryBuilder(Users, 'user')
            .select(['user.id', 'user.username', 'user.email'])
            .leftJoinAndSelect('user.guests', 'guests')
            .getMany();
    }

    @Roles(RolesEnum.ADMIN)
    @Patch('users/:userId/guests')
    createGuest(@Param('userId') userId: string, @Body() guests: Guests[]) {
        return Promise.all(guests.map(guest => {
            return this.entityService.getRepository('Guests').save({
                ...guest,
                userId
            });
        })
        );
    }
}