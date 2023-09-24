import { Module } from "@nestjs/common";
import { DataModule } from "../data/data.module";
import { AlbumsController } from "./albums.controller";
import { AlbumsService } from "./albums.service";

@Module({
    imports: [DataModule],
    providers: [AlbumsService],
    controllers: [AlbumsController]
})
export class AlbumsModule {}