import { Injectable, OnModuleInit } from "@nestjs/common";
import { Song } from "./data.types";
import * as fs from 'fs'
import * as csv from 'csv-parser'
import { MONTH_NAME_NUMBER_MAPPING } from "../../utils";

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
        return playRows.map(pRow => ({ Song: row['Song'], Artist: row['Artist'], Writer: row['Writer'], Album: row['Album'], Year: parseInt(row['Year'], 10), ...pRow}))
    }

    getPlayRows(row: any): Array<Pick<Song, 'Plays'> & Pick<Song, 'Month'>> {
        const playsRegex = /^Plays\s-\s[a-zA-Z]+$/
        const playKeys = Object.keys(row).filter( k => k.match(playsRegex))

        let rows: Array<Pick<Song, 'Plays'> & Pick<Song, 'Month'>> = []

        for (const pKey of playKeys) {
            const [_, monthName ] = pKey.split(" - ")
            const Month = MONTH_NAME_NUMBER_MAPPING[monthName.toLowerCase()]
            const Plays = Number.parseInt(row[pKey], 10)
            rows = [...rows, { Month, Plays }]
        }

        return rows
    }

    getSongs(): Song[] {
        return this.SongsRecords
    }


}