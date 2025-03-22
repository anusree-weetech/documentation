import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {} // <-- Inject PowerService

  compute(a: number, b: number) {
    console.log('Computing...');
    this.powerService.supplyPower(50); // Example usage of PowerService
    return a + b;
  }
}
