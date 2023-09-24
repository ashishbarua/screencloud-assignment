import { Injectable } from "@nestjs/common";
import { DataService } from "../data/data.service";
import { SongRecord } from "../data/data.types";
import { AlbumOrderBy, AlbumRecord, AlbumsFilterDto } from "./albums.types";
import { getTotalPlayCounts } from "src/utils";

@Injectable()
export class AlbumsService {

    constructor (private dataService: DataService) {}
    getAll(params: AlbumsFilterDto): AlbumRecord[] {
        const retrievedSongs = this.dataService.getSongs(params)
        const albumGroupedRecords = this.getAlbumGroupedRecords(retrievedSongs)
        const orderedAlbumRecords = this.getOrderedAlbums(params.orderBy, albumGroupedRecords, params.isDesc || false)
        return orderedAlbumRecords
    }

    getAlbumGroupedRecords(songs: SongRecord[]): AlbumRecord[] {
        const albumSongsMapping: Record<string, SongRecord[]> = {}
        for (const song of songs) {
            const existingAlbumRecord = albumSongsMapping[song.Album]
            albumSongsMapping[song.Album] = existingAlbumRecord ? [...existingAlbumRecord, song] : [song]
        }

        let albumRecords: AlbumRecord[] = []

        for (const albumName of Object.keys(albumSongsMapping)) {
            const record: AlbumRecord = { 
                Album: albumName,
                SongRecords: albumSongsMapping[albumName],
                TotalPlays: this.getTotalPlaysOfSongs(albumSongsMapping[albumName])
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

    getOrderedAlbums(orderBy: AlbumOrderBy, albums: AlbumRecord[], isDesc = false): AlbumRecord[] {
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