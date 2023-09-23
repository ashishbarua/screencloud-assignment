import { Injectable, OnModuleInit } from "@nestjs/common";
import { Song } from "./data.types";
import * as fs from 'fs'
import * as csv from 'csv-parser'
import { MONTH_NAME_NUMBER_MAPPING } from "../../utils";
import { SongsFilterDto } from "../songs/songs.types";
import { compareAsc, subDays } from 'date-fns'

@Injectable()
export class DataService implements OnModuleInit {
    SongsRecords: Array<Song> = []

    onModuleInit() {
        const inputStream = fs.createReadStream('./raw-data.csv', 'utf8')
        inputStream.pipe(csv()).on('data', (row) => {
            const transformedRows = this.transformRow(row)
            this.SongsRecords = [...this.SongsRecords, ...transformedRows]
        }).on('end', () => {
            console.log('Records imported')
        })
    }

    transformRow(row: any): Song[] {
        const playRows = this.getPlayRows(row)
        return playRows.map(pRow => ({ Song: row['Song'], Artist: row['Artist'], Writer: row['Writer'], Album: row['Album'], ...pRow}))
    }

    getPlayRows(row: any): Array<Pick<Song, 'Plays'> & Pick<Song, 'RecordDate'>> {
        const playsRegex = /^Plays\s-\s[a-zA-Z]+$/
        const playKeys = Object.keys(row).filter( k => k.match(playsRegex))

        let rows: Array<Pick<Song, 'Plays'> & Pick<Song, 'RecordDate'>> = []

        for (const pKey of playKeys) {
            const [_, monthName ] = pKey.split(" - ")
            const Month = MONTH_NAME_NUMBER_MAPPING[monthName.toLowerCase()]
            const Year = parseInt(row['Year'], 10)
            const nextDayDate = new Date(Year, Month, 1)
            const RecordDate = subDays(nextDayDate, 1) // Setting the date as the last date of the month - year of the record
            const Plays = Number.parseInt(row[pKey], 10)
            rows = [...rows, { RecordDate, Plays }]
        }

        return rows
    }

    getSongs(params: SongsFilterDto): Song[] {
        const { song, artist, album, writer, yearFrom,  yearTo, monthFrom, monthTo  } = params
        const month = monthFrom || 1
        const dateFrom = new Date(yearFrom, month - 1, 1)
        const dateTo = new Date(yearTo, month - 1, 1)
        return this.SongsRecords.filter(record => {
            let match = true
            if (song) {
                match = match && record.Song.includes(song)
            }
            if (artist) {
                match = match && record.Artist.includes(artist)
            }
            if (album) {
                match = match && record.Album.includes(album)
            }
            if (writer) {
                match = match && record.Writer.includes(writer)
            }
            if (yearFrom) {
                console.log("Record date", record.RecordDate)
                match = match && compareAsc(dateFrom, record.RecordDate) <= 0
            }
            if (yearTo) {
                match = match && compareAsc(dateTo, record.RecordDate) >= 0
            }

            return match
        })
    }


}