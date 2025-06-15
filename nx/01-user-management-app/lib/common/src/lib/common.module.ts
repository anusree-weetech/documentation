import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [DatabaseModule],
})
export class CommonUtilsModule {}
