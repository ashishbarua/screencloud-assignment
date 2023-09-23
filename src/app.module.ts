import { Module } from '@nestjs/common';
import { SongsModule } from './modules/songs/songs.module';

@Module({
  imports: [SongsModule],
  providers: [],
})
export class AppModule {}
