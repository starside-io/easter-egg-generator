#!/usr/bin/env node

import { main } from './cli';

// Run the CLI
main().catch((error: any) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
