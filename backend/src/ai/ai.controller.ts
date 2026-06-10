import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('triage')
  async getTriage(@Body('prompt') prompt: string, @Body('context') context?: string) {
    return this.aiService.getTriagePrediction(prompt, context);
  }
}
