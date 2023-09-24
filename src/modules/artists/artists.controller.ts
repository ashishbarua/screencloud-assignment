import { Controller, Get, Query } from "@nestjs/common";
import { ArtistsService } from "./artists.service";
import { ApiResponse } from "@nestjs/swagger";
import { ArtistResponseDto, ArtistsFilterDto } from "./artists.types";

@Controller('artist')
export class ArtistsController {
    constructor(private albumsService: ArtistsService) {}
    @Get()
    @ApiResponse({ status: 200, description: 'List of albums requested', type: ArtistResponseDto })
    albums(@Query() params: ArtistsFilterDto): ArtistResponseDto {
        return { albums: this.albumsService.getAll(params) }
    }
}