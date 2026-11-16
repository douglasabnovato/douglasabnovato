// Teste de ponta a ponta do perfil: o README renderizado pelo GitHub e o clique até o portfólio
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  timeout: 60_000,
  retries: process.env.CI ? 1 : 0,
  use: { viewport: { width: 1280, height: 800 } },
});
