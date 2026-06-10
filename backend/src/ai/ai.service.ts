import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private groq: Groq;

  constructor(private configService: ConfigService) {
    this.groq = new Groq({
      apiKey: this.configService.get<string>('GROQ_API_KEY') || 'mock-key',
    });
  }

  async getTriagePrediction(prompt: string, context?: string) {
    const apiKey = this.configService.get<string>('GROQ_API_KEY');
    
    let systemPrompt = 'You are an expert medical AI assistant for MedCore Hospital. Act as a concise clinical copilot. Format answers beautifully using Markdown. \n\nIMPORTANT CONTEXT: You are currently reviewing the chart for a generic active patient: "John Doe, 58y male, Hx of Hypertension and T2DM. Presenting today with mild exertional chest tightness and shortness of breath. BP 142/90, HR 88. Current meds: Metformin, Lisinopril." \n\nIf the user asks for summaries, diagnoses, or ICD codes, base your entire response SPECIFICALLY on this patient\'s data. Do not ask for more information unless absolutely necessary. Keep responses direct and actionable.';
    if (context) {
      systemPrompt = `You are a highly specialized AI Agent named "${context}" operating within MedCore Hospital. You must strictly fulfill the role of the ${context}. Respond beautifully in Markdown format. Keep answers concise, actionable, and extremely professional. Focus solely on your specific domain.`;
    }

    if (apiKey && apiKey !== 'mock-key') {
      try {
        const completion = await this.groq.chat.completions.create({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          model: 'llama-3.1-8b-instant'
        });
        return { response: completion.choices[0]?.message?.content || '' };
      } catch (err) {
        console.error('Groq API Error:', err);
      }
    }
    
    // Mock response if no API key
    return {
      response: "I'm currently running in offline mock mode. If connected to Groq, I would provide a professional, markdown-formatted response regarding:\n\n*" + prompt + "*\n\n**Action Items:**\n- Check vitals\n- Review labs"
    };
  }
}
