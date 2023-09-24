import { Module } from "@nestjs/common";
import { DataModule } from "../data/data.module";
import { ArtistsController } from "./artists.controller";
import { ArtistsService } from "./artists.service";

@Module({
    imports: [DataModule],
    controllers: [ArtistsController],
    providers: [ArtistsService]
})
export class ArtistsModule {}