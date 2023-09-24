import { Injectable } from "@nestjs/common";
import { DataService } from "../data/data.service";
import { SongsFilterDto, SongsResponseDTO } from "./songs.types";
import { getTotalPlayCounts } from "src/utils";

@Injectable()
export class SongsService {

    constructor(private dataService: DataService) {}
    getAll(params: SongsFilterDto ): SongsResponseDTO [] {
        const retrievedSongs = this.dataService.getSongs(params)
        return retrievedSongs.map(song => ({ ...song, TotalPlays: getTotalPlayCounts(song.PlayDetails)}))
    }
}