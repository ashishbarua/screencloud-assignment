import { Module } from '@nestjs/common';
import { SongsModule } from './modules/songs/songs.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { ArtistsModule } from './modules/artists/artists.module';

@Module({
  imports: [SongsModule, AlbumsModule, ArtistsModule],
  providers: [],
})
export class AppModule {}
