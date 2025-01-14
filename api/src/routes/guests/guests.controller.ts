import { Body, Controller, Get, Logger, Param, Patch } from "@nestjs/common";
import * as argon2 from "argon2";
import { Roles } from "src/auth/roles.decorator";
import { User } from "src/auth/user.decorator";
import { RolesEnum } from "src/entities/definitions";
import { EntitiesService } from "src/entities/entities.service";
import { Guests } from "src/entities/schemas/guests";
import { Users } from "src/entities/schemas/users";
import { NoLogger } from "src/no-logger.decorator";
import { NotificationService } from "src/services/notifications.service";

@Controller('guests')
export class GuestsController {
    private readonly logger: Logger = new Logger(GuestsController.name)
    constructor(
        private readonly entityService: EntitiesService,
        private readonly notificationServcie: NotificationService
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

    @NoLogger('password', 'password-verif')
    @Patch()
    async patchGuests(@User() user: any, @Body() body: Users & { guests: Guests[] }) {
        console.log('-----', body.guests)


        await Promise.all(
            body.guests.map(guest => {
                if (!guest.reception) {
                    guest.dinner = false
                }

                if (guest.dinner === false) {
                    guest.menu = null
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

        try {

            const userAndGuests = await this.entityService.manager.findOne(Users, { where: { id: user.id }, relations: ['guests'] },)

            const isUpdate = Boolean(user.repliedAt)

            this.notificationServcie.sendSmsByFree(`
${isUpdate ? 'Modification de' : 'Nouvelle réponse de'}%0A
${userAndGuests.username}%0A
Avec repas : ${userAndGuests.withDinner ? 'OUI' : 'NON'}%0A
${userAndGuests.guests.map((guest, index) => {
                return `${index + 1}- ${guest.firstname} ${guest.lastname} - ${guest.reception ? 'Prés' : 'Abs'}${userAndGuests.withDinner ? ` - ${guest.dinner ? guest.menu : 'Abs'}` : ``}`
            }).join('%0A')
                }
                `).catch(() => {
                    this.logger.error('erreur envoie notification')
                })

        } catch (e) {
            this.logger.error('erreur génération notification')
        }
    }


    @Roles(RolesEnum.ADMIN)
    @Get('all')
    getAllGuests() {
        return this.entityService.manager.createQueryBuilder(Users, 'user')
            .select(['user.id', 'user.username', 'user.email', 'user.withDinner', 'user.uuid', 'user.repliedAt', 'user.campingCount'])
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
