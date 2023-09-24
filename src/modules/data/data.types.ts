import { ApiProperty } from "@nestjs/swagger"

export class PlayDetail {
    @ApiProperty()
    RecordDate: Date
    @ApiProperty()
    Plays: number
}

export class SongRecord {
    @ApiProperty()
    Song: string
    @ApiProperty()
    Artist: string
    @ApiProperty()
    Writer: string
    @ApiProperty()
    Album: string
    @ApiProperty({ type: [PlayDetail]})
    PlayDetails: PlayDetail[]
}