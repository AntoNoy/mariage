import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";

const providers = [AuthService];

@Module({
  imports: [],
  providers,
  exports: providers,
})
export class ServicesModule {}
