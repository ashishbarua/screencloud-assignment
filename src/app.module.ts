import { Module } from '@nestjs/common';
import { SongsModule } from './modules/songs/songs.module';
import { AlbumsModule } from './modules/albums/albums.module';

@Module({
  imports: [SongsModule, AlbumsModule],
  providers: [],
})
export class AppModule {}
