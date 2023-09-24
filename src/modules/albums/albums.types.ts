import { ApiProperty } from "@nestjs/swagger"
import { SongRecord } from "../data/data.types"
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { Type } from "class-transformer"

export enum AlbumOrderBy {
    TotalPlays = 'TotalPlays',
    Album = 'Album'
}

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

export class AlbumsFilterDto {
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

    @ApiProperty({ description: 'Order By', required: false, enum: AlbumOrderBy})
    @IsOptional()
    @IsEnum(AlbumOrderBy)
    orderBy?: AlbumOrderBy

    @ApiProperty({ description: 'Is Descending? Set to true if order should be in desc. order', required: false })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    isDesc?: boolean
}