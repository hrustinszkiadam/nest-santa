import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Get the health status of the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Health status of the application.',
    example: { status: 'ok' },
  })
  @Get()
  getHealth() {
    return this.appService.getHealth();
  }
}
