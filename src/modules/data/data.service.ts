import { Injectable, OnModuleInit } from "@nestjs/common";
import { SourceData } from "./data.types";
import * as fs from 'fs'
import * as csv from 'csv-parser'
import { MONTH_NAME_NUMBER_MAPPING } from "../../utils";

@Injectable()
export class DataService implements OnModuleInit {
    sourceData: Array<SourceData> = []

    onModuleInit() {
        const inputStream = fs.createReadStream('./raw-data.csv', 'utf8')
        inputStream.pipe(csv()).on('data', (row) => {
            const transformedRows = this.transformRow(row)
            this.sourceData = [...this.sourceData, ...transformedRows]
        }).on('end', () => {
            console.log('No more rows!')
        })
    }

    transformRow(row: any): SourceData[] {
        console.log("What is this", this)
        const playRows = this.getPlayRows(row)
        return playRows.map(pRow => ({ Song: row['Song'], Artist: row['Artist'], Writer: row['Writer'], Album: row['Album'], Year: row['Year'], ...pRow}))
    }

    getPlayRows(row: any): Array<Pick<SourceData, 'Plays'> & Pick<SourceData, 'Month'>> {
        const playsRegex = /^Plays\s-\s[a-zA-Z]+$/
        const playKeys = Object.keys(row).filter( k => k.match(playsRegex))

        let rows: Array<Pick<SourceData, 'Plays'> & Pick<SourceData, 'Month'>> = []

        for (const pKey of playKeys) {
            const [_, monthName ] = pKey.split(" - ")
            const Month = MONTH_NAME_NUMBER_MAPPING[monthName.toLowerCase()]
            const Plays = Number.parseInt(row[pKey], 10)
            rows = [...rows, { Month, Plays }]
        }

        return rows
    }


}