/**
 * Provider Base Abstraction for Clawra Image Generation
 */

export interface ProviderInput {
  prompt: string;
  model?: string;
  aspect_ratio?: string;
  num_images?: number;
}

export interface ProviderOutput {
  url?: string;
  b64_json?: string;
  mime_type?: string;
  revised_prompt?: string;
}

export interface ImageProvider {
  name: string;
  isConfigured(): boolean;
  generate(input: ProviderInput): Promise<ProviderOutput[]>;
  getConfigRequirements(): string[];
}

export abstract class BaseProvider implements ImageProvider {
  abstract name: string;
  abstract isConfigured(): boolean;
  abstract generate(input: ProviderInput): Promise<ProviderOutput[]>;
  abstract getConfigRequirements(): string[];

  protected getModel(defaultModel: string): string {
    return process.env.CLAWRA_IMAGE_MODEL || defaultModel;
  }

  protected getApiKey(envVar: string): string | undefined {
    return process.env[envVar];
  }
}
