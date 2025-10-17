// backend/test/jest-environment-node.ts
import NodeEnvironment from 'jest-environment-node';
import type { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment';
import { config } from 'dotenv';
import path from 'path';

export default class CustomEnvironment extends NodeEnvironment {
  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    // Load the .env.test file before anything else happens.
    // This ensures that process.env is populated correctly from the start.
    const envTestPath = path.resolve(process.cwd(), 'test/.env.test');
    const dotenvResult = config({ path: envTestPath });

    super(config, { ...context, console: new console.Console(process.stdout, process.stderr) });

    this.global.process.env = { ...process.env, ...dotenvResult.parsed };
  }
}