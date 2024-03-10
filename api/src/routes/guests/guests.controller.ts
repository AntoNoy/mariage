import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
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
        return this.entityService.getRepository('Guests').find({
            where: { userId: user.id },
        });
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