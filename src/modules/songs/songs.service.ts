import { Injectable } from "@nestjs/common";
import { DataService } from "../data/data.service";
import { OrderBy, SongRecordAndTotalPlays, SongsFilterDto } from "./songs.types";
import { getTotalPlayCounts } from "src/utils";

@Injectable()
export class SongsService {

    constructor(private dataService: DataService) {}
    getAll(params: SongsFilterDto ): SongRecordAndTotalPlays[] {
        const retrievedSongs: SongRecordAndTotalPlays[] = this.dataService.getSongs(params).map(song => ({ ...song, TotalPlays: getTotalPlayCounts(song.PlayDetails)}))
        const orderedSongs = this.getOrderedSongs(params.orderBy, retrievedSongs, params.isDesc || false)
        return orderedSongs
    }

    getOrderedSongs(orderBy: OrderBy, songs: SongRecordAndTotalPlays[], isDesc = false): SongRecordAndTotalPlays[] {
        const orderedSongs = [...songs]
        if (orderBy) {
            orderedSongs.sort((songA, songB) => {
                const valA = songA[orderBy]
                const valB = songB[orderBy]
                const orderResult = valA < valB ? -1 : 1
                return isDesc ? orderResult * -1 : orderResult
            })
        }
        return orderedSongs
    }
}