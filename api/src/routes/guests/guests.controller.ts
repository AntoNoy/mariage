import { Controller, Get } from "@nestjs/common";
import { User } from "src/auth/user.decorator";

@Controller('guests')
export class GuestsController {


    @Get()
    getGuests(@User('id') user: any){
        console.log('getGuests', user);
        return 'This will return all guests';
    }
 }