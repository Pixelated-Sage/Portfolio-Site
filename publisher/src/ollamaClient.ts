import { config } from './config.js';

export interface OllamaMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function callOllama(
  messages: OllamaMessage[],
  jsonFormat = false,
  maxRetries = 2
): Promise<string> {
  const url = `${config.ollamaBaseUrl}/api/chat`;

  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt <= maxRetries) {
    try {
      const body: Record<string, unknown> = {
        model: config.ollamaModel,
        messages,
        stream: false,
        options: {
          temperature: 0.1,
          num_predict: 2048,
        },
      };

      if (jsonFormat) {
        body.format = 'json';
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Ollama API error (${response.status}): ${errText}`);
      }

      const data = (await response.json()) as { message?: { content?: string } };
      const content = data.message?.content?.trim();

      if (!content) {
        throw new Error('Ollama returned empty response');
      }

      // If jsonFormat requested, verify it parses cleanly
      if (jsonFormat) {
        JSON.parse(content);
      }

      return content;
    } catch (err) {
      lastError = err as Error;
      attempt++;
      if (attempt <= maxRetries) {
        // Wait 500ms before retrying
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  }

  throw new Error(
    `Ollama call failed after ${maxRetries + 1} attempts. Last error: ${lastError?.message}`
  );
}
