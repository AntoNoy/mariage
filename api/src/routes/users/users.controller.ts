import { Body, Controller, Get, Logger, NotFoundException, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { Roles } from "src/auth/roles.decorator";
import { User } from "src/auth/user.decorator";
import { RolesEnum } from "src/entities/definitions";
import { EntitiesService } from "src/entities/entities.service";
import { Guests, TypeGuest } from "src/entities/schemas/guests";
import { Users } from "src/entities/schemas/users";

@Controller('users')
export class UsersController {
    private readonly logger:Logger= new Logger(UsersController.name)
    constructor(
        private readonly entitiesService: EntitiesService
    ) { }

    @Roles(RolesEnum.ADMIN)
    @Post()
    async saveUser(@Body() userPayload: Users) {
        const previousUser = await this.entitiesService.manager.findOne(Users, { where: { id: userPayload.id }, relations: ['guests'] })
        if (
            previousUser &&
            previousUser.guests.length === userPayload.guests.length &&
            previousUser.guests.filter(g => g.type === TypeGuest.ADULT).length === userPayload.guests.filter(g => g.type === TypeGuest.ADULT).length &&
            previousUser.guests.filter(g => g.type === TypeGuest.CHILD).length === userPayload.guests.filter(g => g.type === TypeGuest.CHILD).length
        ) {
            this.logger.log(`Aucune modif pour l'user ${userPayload.username}`)
            return
        }
        const user = await this.entitiesService.manager.save(Users, { id: userPayload.id, username: userPayload.username, withDinner: userPayload.withDinner, repliedAt: null })
        if (!user) {
            return;
        }
        await this.entitiesService.manager.delete(Guests, { userId: user.id })
        if (userPayload.guests) {
            await Promise.all(
                userPayload.guests.map(guest => this.entitiesService.manager.save(Guests, { ...guest, userId: user.id }))
            )
        }
    }

    @Get('alreadyReplied')
    async alreadyReplied(@User('id') userId: number): Promise<boolean> {
        const user = await this.entitiesService.manager.findOne(Users, { where: { id: userId } })
        if (!user) {
            throw new NotFoundException('Utilisateur non connu')
        }
        return user.repliedAt !== null
    }

    @Get('camping')
    async getCamping(@User('id') userId: number) {
        const user = await this.entitiesService.manager.findOne(Users, { where: { id: userId } })
        if (!user) {
            throw new NotFoundException('Utilisateur non connu')
        }
        return user.campingCount
    }

    @Patch('camping/:count')
    async patchCamping(@User('id') userId: number, @Param('count', ParseIntPipe) count: number) {
        const user = await this.entitiesService.manager.findOne(Users, { where: { id: userId } })
        if (!user) {
            throw new NotFoundException('Utilisateur non connu')
        }
        await this.entitiesService.manager.update(Users, { id: userId }, { campingCount: count })
    }
}