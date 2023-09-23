import { Controller, Get } from "@nestjs/common";
import { Song } from "../data/data.types";
import { SongsService } from "./songs.service";


@Controller('song')
export class SongsController {

    constructor(private songsService: SongsService) {}

    @Get()
    songs(): Song[] {
        return this.songsService.getAll()
    }
}