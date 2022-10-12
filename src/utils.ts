/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { readFileSync } from 'fs';
import { load } from 'js-yaml';

export type Config = {
  rules: {
    apiKey: string;
  };
};

export const readConfigFromYAML = (configPath: string): Config => {
  try {
    const content = readFileSync(configPath, { encoding: 'utf8' });
    const config = load(content) as Config;

    if (!config || !config.rules || !config.rules.apiKey) {
      throw Error('apiKey not found');
    }

    return config;
  } catch (e: any) {
    throw Error(e.message);
  }
};
