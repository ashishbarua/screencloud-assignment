import { Injectable } from "@nestjs/common";
import { DataService } from "../data/data.service";
import { SongRecord } from "../data/data.types";
import { AlbumRecord } from "./albums.types";
import { getTotalPlayCounts } from "src/utils";

@Injectable()
export class AlbumsService {

    constructor (private dataService: DataService) {}
    getAll(): AlbumRecord[] {
        const retrievedSongs = this.dataService.getSongs({})
        const albumGroupedRecords = this.getAlbumGroupedRecords(retrievedSongs)
        return albumGroupedRecords
    }

    getAlbumGroupedRecords(songs: SongRecord[]): AlbumRecord[] {
        const albumSongsMapping: Record<string, SongRecord[]> = {}
        for (const song of songs) {
            const existingAlbumRecord = albumSongsMapping[song.Song]
            albumSongsMapping[song.Song] = existingAlbumRecord ? [...existingAlbumRecord, song] : [song]
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
}