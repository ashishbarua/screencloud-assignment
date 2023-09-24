import { Controller, Get, Query } from "@nestjs/common";
import { AlbumsService } from "./albums.service";
import { ApiResponse } from "@nestjs/swagger";
import { AlbumResponseDto, AlbumsFilterDto } from "./albums.types";


@Controller('album')
export class AlbumsController {

    constructor(private albumsService: AlbumsService) {}
    @Get()
    @ApiResponse({ status: 200, description: 'List of albums requested', type: AlbumResponseDto })
    albums(@Query() params: AlbumsFilterDto): AlbumResponseDto {
        return { albums: this.albumsService.getAll(params) }
    }
}