import { Controller, Get, Query } from "@nestjs/common";
import { SongRecord } from "../data/data.types";
import { SongsService } from "./songs.service";
import { ApiResponse } from "@nestjs/swagger";
import { SongsFilterDto, SongsResponseDto } from "./songs.types";


@Controller('song')
export class SongsController {

    constructor(private songsService: SongsService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'List of songs requested', type: SongsResponseDto })
    songs(@Query() params: SongsFilterDto): {songs: SongRecord[]} {
        return { songs: this.songsService.getAll(params) }
    }
}