import { defineConfig } from 'cypress';

export default defineConfig({
    reporter: 'mochawesome',
    reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
    inlineAssets: true
  },
  e2e: { 
        setupNodeEvents(on, config) {
            on('task', {
  log(message) {
    console.log(message);
    return null;
  },
});
      // codeCoverageTask if needed, but disable for now
    },
    env: {
    coverage: false  // Add this
  },   
supportFile: './support/e2e.ts',
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'integration/e2e/*.{js,ts}',
  },
});
