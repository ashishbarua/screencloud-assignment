import { Controller, Get, Query } from "@nestjs/common";
import { SongsService } from "./songs.service";
import { ApiResponse } from "@nestjs/swagger";
import { SongsFilterDto, SongsResponseDto } from "./songs.types";


@Controller('song')
export class SongsController {

    constructor(private songsService: SongsService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'List of songs requested', type: SongsResponseDto })
    songs(@Query() params: SongsFilterDto): SongsResponseDto {
        return { songs: this.songsService.getAll(params) }
    }
}