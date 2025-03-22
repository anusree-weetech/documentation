import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from './reports.entity';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [Report],
})
export class ReportsModule {}
