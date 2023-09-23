import { ApiProperty } from "@nestjs/swagger";
import { Song } from "../data/data.types";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class SongsResponseDto {
    @ApiProperty({ type: [Song] })
    songs: Song[]
}

export class SongsFilterDto {
    @ApiProperty({ description: "Song name", required: false })
    @IsOptional()
    @IsString()
    song?: string

    @ApiProperty({ description: "Artist name", required: false})
    @IsOptional()
    @IsString()
    artist?: string

    @ApiProperty({ description: "Writer name", required: false})
    @IsOptional()
    @IsString()
    writer?: string

    @ApiProperty({ description: "Album name", required: false})
    @IsOptional()
    @IsString()
    album?: string

    @ApiProperty( { description: "From year", required: false })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    yearFrom?: number
    
    @ApiProperty({ description: "To year", required: false})
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    yearTo?: number

    @ApiProperty({ description: "From month", required: false})
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    monthFrom?: number

    @ApiProperty({ description: "To month", required: false})
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    monthTo?: number
}