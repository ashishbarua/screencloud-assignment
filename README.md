# Campaigns Manager API

This API lists all the songs along with details such as artist(s), albums(s) and total plays by month-year. There are separate endpoints to filter and sort the data for songs, albums and artists.

# Setup
- As this project requires NodeJS, please install it first. Once installed, please run the following command to install **pnpm**: `npm i -g pnpm`
- Download/clone the project
- Navigate to the root directory and run `pnpm install` to install all dependencies
- After installing all the dependencies, the project can be run in one of 2 ways:-
	- **dev mode** 
		- run `pnpm start:dev`
	- **prod mode**
		-  run `pnpm build` 
		- run `pnpm start:prod`

For simplicity, you can choose to run it on **dev mode**
- Navigate to http://localhost:3000/docs#/ to test the API using swagger.

## API Guidelines
- There are 3 endpoints available in the API:-
	- `/song`: To list all the songs' data
	- `/album`: To list all the songs' data grouped by albums
	-  `/artist`: To list all the songs' data grouped by artists

- The following query fields are available for filtering/sorting the data in all 3 endpoints:-
- `song`:  Filter data by matching song name
- `artist`: Filter data by matching artist name
- `writer`: Filter data by matching writer name
- `album`: Filter data by matching album name
- `yearFrom`: Filter all data having songs' play record on or after the provided year
- `monthFrom`: Filter all data having songs' play record on or after the provided  month **and** year (from `yearFrom`). Without `yearFrom`, this parameter will have no effect
- `yearTo`: Filter all data having songs' play record before the provided year
- `monthTo` Filter all data having songs' play record before the provided month and year (from `yearTo`). Without `yearTo` , this parameter will have no effect
- `orderBy`: To select one of many order by fields. The options to sort vary by endpoint
- `isDesc`: To select ascending/descending order. If unselected, `orderBy` is done by ascending order

The data provided for the assignment is loaded from [this csv file](https://github.com/ashishbarua/screencloud-assignment/blob/main/raw-data.csv) and each record is stored in memory of the API in the following format:

```

type SongRecord = {
      "Song": string, // name of the song
      "Artist": string, // name of the artist
      "Writer": string, // name of the writer
      "Album": string, // name of the album
      "PlayDetails": Array<PlayDetail>, // List of PlayDetails type
      "TotalPlays": number, // Total Plays from all PlayDetails combined
    }

type PlayDetail = {
	RecordDate: Date // Date (derived from month-year) of the total play count
	Plays: number // Total plays count
}
```

The swagger document can be referred to for the return types of each of the endpoints.

