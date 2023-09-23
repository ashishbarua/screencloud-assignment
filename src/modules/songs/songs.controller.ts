import { Controller, Get } from "@nestjs/common";
import { Song } from "../data/data.types";
import { SongsService } from "./songs.service";
import { ApiResponse } from "@nestjs/swagger";
import { SongsResponseDto } from "./songs.types";


@Controller('song')
export class SongsController {

    constructor(private songsService: SongsService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'List of songs requested', type: SongsResponseDto })
    songs(): {songs: Song[]} {
        return { songs: this.songsService.getAll() }
    }
}