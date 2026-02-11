/**
 * Provider Factory
 */

import { OpenAIProvider } from "./openai";
import { FalProvider } from "./fal";
import { ImageProvider } from "./base";

export function getProvider(): ImageProvider {
  const providerType = process.env.CLAWRA_IMAGE_PROVIDER;
  const openai = new OpenAIProvider();
  const fal = new FalProvider();

  // Explicit override always wins.
  if (providerType) {
    switch (providerType) {
      case "openai":
        return openai;
      case "fal":
        return fal;
      default:
        throw new Error(`Unknown provider: ${providerType}`);
    }
  }

  // Default behavior:
  // 1) prefer OpenAI when configured
  // 2) fallback to Fal when OpenAI key is missing
  // 3) otherwise return OpenAI so error message points to OPENAI_API_KEY
  if (openai.isConfigured()) return openai;
  if (fal.isConfigured()) return fal;
  return openai;
}

export { OpenAIProvider, FalProvider };
