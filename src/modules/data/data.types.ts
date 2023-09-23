import { ApiProperty } from "@nestjs/swagger"

export class Song {
    @ApiProperty()
    Song: string
    @ApiProperty()
    Artist: string
    @ApiProperty()
    Writer: string
    @ApiProperty()
    Album: string
    // @ApiProperty()
    // Year: number
    @ApiProperty()
    Plays: number
    // @ApiProperty()
    // Month: number
    @ApiProperty()
    RecordDate: Date
}