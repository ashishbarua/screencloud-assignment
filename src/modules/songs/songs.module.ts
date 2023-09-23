import { Module } from "@nestjs/common";
import { SongsService } from "./songs.service";
import { SongsController } from "./songs.controller";
import { DataModule } from "../data/data.module";

@Module({
    imports: [DataModule],
    controllers: [SongsController],
    providers: [SongsService],
})
export class SongsModule {}