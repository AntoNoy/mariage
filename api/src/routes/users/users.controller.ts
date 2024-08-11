import { Controller, Get, NotFoundException, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { User } from "src/auth/user.decorator";
import { EntitiesService } from "src/entities/entities.service";
import { Users } from "src/entities/schemas/users";

@Controller('users')
export class UsersController {
    constructor(
        private readonly entitiesService: EntitiesService
    ) { }

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