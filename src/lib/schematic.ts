import { SchematicClient } from "@schematichq/schematic-typescript-node";
if (!process.env.sCHEMATIC_API_KEY) {
  throw new Error("Schematic API key is not set.");
}
export const client = new SchematicClient({
  apiKey: process.env.sCHEMATIC_API_KEY,
  cacheProviders: {
    flagChecks: [],
  },
});
