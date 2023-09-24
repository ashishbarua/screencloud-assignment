import { ApiProperty } from "@nestjs/swagger"
import { SongRecord } from "../data/data.types"
import { IsNumber, IsString } from "class-validator"

export class AlbumRecord {
    @ApiProperty({ type: String })
    @IsString()
    Album: string

    @ApiProperty({ type: [SongRecord]})
    SongRecords: SongRecord[]

    @ApiProperty({ type: Number })
    @IsNumber()
    TotalPlays: number
}

export class AlbumResponseDto {
    @ApiProperty({ type: [AlbumRecord]})
    albums: AlbumRecord[]
}