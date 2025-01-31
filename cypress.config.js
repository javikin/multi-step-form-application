import { defineConfig } from 'cypress';

module.exports = defineConfig({
  e2e: {
    
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',    
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,    
    video: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',    
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    supportFile: false,
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
