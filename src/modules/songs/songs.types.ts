import { ApiProperty } from "@nestjs/swagger";
import { Song } from "../data/data.types";

export class SongsResponseDto {
    @ApiProperty({ type: [Song] })
    songs: Song[]
}