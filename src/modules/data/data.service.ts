import { Injectable, OnModuleInit } from "@nestjs/common";
import { PlayDetail, SongRecord } from "./data.types";
import * as fs from 'fs'
import * as csv from 'csv-parser'
import { MONTH_NAME_NUMBER_MAPPING, getTotalPlayCounts } from "../../utils";
import { OrderBy, SongsFilterDto } from "../songs/songs.types";
import { compareAsc, subDays } from 'date-fns'

@Injectable()
export class DataService implements OnModuleInit {
    SongsRecords: Array<SongRecord> = []

    onModuleInit() {
        const inputStream = fs.createReadStream('./raw-data.csv', 'utf8')
        inputStream.pipe(csv()).on('data', (row) => {
            const transformedRow = this.transformRow(row)
            this.SongsRecords = [...this.SongsRecords, transformedRow]
        }).on('end', () => {
            console.log('Records imported')
        })
    }

    transformRow(row: any): SongRecord {
        const playRows = this.getPlayRows(row)
        
        return { Song: row['Song'], Artist: row['Artist'], Writer: row['Writer'], Album: row['Album'], PlayDetails: playRows }
    }

    getPlayRows(row: any): PlayDetail[] {
        const playsRegex = /^Plays\s-\s[a-zA-Z]+$/
        const playKeys = Object.keys(row).filter( k => k.match(playsRegex))

        let rows: PlayDetail[] = []

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

    getSongs(params: SongsFilterDto): SongRecord[] {
        let resultSongs = this.getFilteredSongs(params)
        if (params.orderBy) {
            resultSongs = this.getOrderedSongs(params.orderBy, resultSongs, params.isDesc || false)
        }

        return resultSongs
    }

    getOrderedSongs(orderBy: OrderBy, songs: SongRecord[], isDesc = false): SongRecord[] {
        const orderedSongs = [...songs]
        if (orderBy === OrderBy.Plays) {
            orderedSongs.sort((songA, songB) => {
                const totalPlaysA = getTotalPlayCounts(songA.PlayDetails)
                const totalPlaysB = getTotalPlayCounts(songB.PlayDetails)
                if (!isDesc) {
                    return totalPlaysA - totalPlaysB
                }
                return totalPlaysB - totalPlaysA
            })
        } else if (orderBy) {
            orderedSongs.sort((songA, songB) => {
                const valA = songA[orderBy]
                const valB = songB[orderBy]
                const orderResult = valA < valB ? -1 : 1
                return isDesc ? orderResult * -1 : orderResult
            })
        }
        return orderedSongs
    }

    getFilteredSongs(params: SongsFilterDto): SongRecord[] {
        const { song, artist, album, writer } = params
        let filteredRecords = this.getRecordsFilteredByDates(params)
        filteredRecords = filteredRecords.filter(record => {
            let match = true
            if (song) {
                match = match && record.Song.toLowerCase().includes(song.toLowerCase())
            }
            if (artist) {
                match = match && record.Artist.toLowerCase().includes(artist.toLowerCase())
            }
            if (album) {
                match = match && record.Album.toLowerCase().includes(album.toLowerCase())
            }
            if (writer) {
                match = match && record.Writer.toLowerCase().includes(writer.toLowerCase())
            }

            return match
        })
        return filteredRecords
    }

    getRecordsFilteredByDates(params: SongsFilterDto): SongRecord[] {
        const { yearFrom, yearTo, monthFrom, monthTo } = params
        if (!yearFrom && !yearTo) {
            return this.SongsRecords
        }
        const dateFrom = new Date(yearFrom, (monthFrom || 1) - 1, 1)
        const dateTo = new Date(yearTo, (monthTo || 1) - 1, 1)
        let recordsWithFilteredPlayDetails = []

        for (let i = 0; i < this.SongsRecords.length; i++) {
            const record = this.SongsRecords[i]
            const playDetails = record.PlayDetails
            let filteredPlayDetails = playDetails
            if (yearFrom) {
                filteredPlayDetails = filteredPlayDetails.filter(detail => (compareAsc(dateFrom, detail.RecordDate) <= 0))
            }
            if (yearTo) {
                filteredPlayDetails = filteredPlayDetails.filter(detail => (compareAsc(dateTo, detail.RecordDate) >= 0))
            }
            if (filteredPlayDetails.length > 0) {
                recordsWithFilteredPlayDetails = [...recordsWithFilteredPlayDetails, { ...record, PlayDetails: filteredPlayDetails}]
            }
        }

        return recordsWithFilteredPlayDetails
    }

}