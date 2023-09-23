import { Injectable } from "@nestjs/common";
import { Song } from "../data/data.types";
import { DataService } from "../data/data.service";

@Injectable()
export class SongsService {

    constructor(private dataService: DataService) {}
    getAll(): Song[] {
        return this.dataService.SongsRecords
    }
}