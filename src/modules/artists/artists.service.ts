import { Injectable } from "@nestjs/common";
import { DataService } from "../data/data.service";
import { ArtistOrderBy, ArtistRecord, ArtistsFilterDto } from "./artists.types";
import { SongRecord } from "../data/data.types";
import { getTotalPlayCounts } from "src/utils";

@Injectable()
export class ArtistsService {
    constructor (private dataService: DataService) {}

    getAll(params: ArtistsFilterDto): ArtistRecord[] {
        const retrievedSongs = this.dataService.getSongs(params)
        const artistsGroupedRecords = this.getAristGroupedRecords(retrievedSongs)
        const orderedArtistRecords = this.getOrderedAlbums(params.orderBy, artistsGroupedRecords, params.isDesc || false)
        return orderedArtistRecords
    }

    getAristGroupedRecords(songs: SongRecord[]): ArtistRecord[] {
        const artistSongsMapping: Record<string, SongRecord[]> = {}
        for (const song of songs) {
            const existingArtistRecord = artistSongsMapping[song.Artist]
            artistSongsMapping[song.Artist] = existingArtistRecord ? [...existingArtistRecord, song] : [song]
        }

        let albumRecords: ArtistRecord[] = []

        for (const artistName of Object.keys(artistSongsMapping)) {
            const record: ArtistRecord = { 
                Artist: artistName,
                SongRecords: artistSongsMapping[artistName],
                TotalPlays: this.getTotalPlaysOfSongs(artistSongsMapping[artistName])
            }
            albumRecords = [ ...albumRecords, record]
        }

        return albumRecords
    }

    getTotalPlaysOfSongs(songRecords: SongRecord[]): number {
        const total = songRecords.reduce((acc, curr) => {
            const totalPlays = getTotalPlayCounts(curr.PlayDetails)
            return totalPlays + acc
        }, 0)
        return total
    }

    getOrderedAlbums(orderBy: ArtistOrderBy, albums: ArtistRecord[], isDesc = false): ArtistRecord[] {
        const orderedAlbums = [...albums]
        if (orderBy) {
            orderedAlbums.sort((songA, songB) => {
                const valA = songA[orderBy]
                const valB = songB[orderBy]
                const orderResult = valA < valB ? -1 : 1
                return isDesc ? orderResult * -1 : orderResult
            })
        }
        return orderedAlbums
    }
}