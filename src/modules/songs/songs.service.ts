import { Injectable } from "@nestjs/common";
import { Song } from "../data/data.types";
import { DataService } from "../data/data.service";
import { SongsFilterDto } from "./songs.types";

@Injectable()
export class SongsService {

    constructor(private dataService: DataService) {}
    getAll(params: SongsFilterDto ): Song[] {
        return this.dataService.SongsRecords
    }
}