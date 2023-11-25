import { Injectable } from "@nestjs/common";
import { EntitiesService } from "src/entities/entities.service";
import { UsersCreate } from "src/entities/definitions";

@Injectable()
export class AuthService {
    constructor(
        private readonly daoService: EntitiesService
    ) {
        this.initDataTest()
    }

    async initDataTest() {
        console.log('initDataTest')
        const users = [
            { email: 'test@aa.a', password: 'azerty', userName: 'aa' },
            { email: 'test@aa.a', password: 'azerty', userName: 'bb' },
            { email: 'test@aa.a', password: 'azerty', userName: 'cc' },
        ]

        await Promise.all(users.map(user => this.addUser(user)))
    }

    addUser(user: UsersCreate) {
        return this.daoService.createUser(user, [])
    }
}