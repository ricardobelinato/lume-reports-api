import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { CONFIG } from './config/config.js';

const { url, logLevel, output, onlyCategories, throttlingMethod, emulatedFormFactor, disableStorageReset } = CONFIG();

(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: logLevel,
    output: output,
    onlyCategories: onlyCategories,
    throttlingMethod: throttlingMethod,
    emulatedFormFactor: emulatedFormFactor,
    disableStorageReset: disableStorageReset,
    port: chrome.port,
    outputPath: 'lighthouse-report.json'
  };

  const runnerResult = await lighthouse(url, options);

  // Extrair as pontuações principais
  const scores = {
    performance: runnerResult.lhr.categories.performance.score * 100,
    accessibility: runnerResult.lhr.categories.accessibility.score * 100,
    bestPractices: runnerResult.lhr.categories["best-practices"].score * 100,
    seo: runnerResult.lhr.categories.seo.score * 100,
    pwa: runnerResult.lhr.categories.pwa?.score ? runnerResult.lhr.categories.pwa.score * 100 : 'N/A'
  };

  console.log("\n📊 Pontuações Gerais:");
  console.table(scores);

  // Extração de métricas detalhadas
  const metrics = {
    FCP: runnerResult.lhr.audits['first-contentful-paint'].displayValue,
    LCP: runnerResult.lhr.audits['largest-contentful-paint'].displayValue,
    TBT: runnerResult.lhr.audits['total-blocking-time'].displayValue,
    CLS: runnerResult.lhr.audits['cumulative-layout-shift'].displayValue,
    TTI: runnerResult.lhr.audits['interactive'].displayValue,
    SpeedIndex: runnerResult.lhr.audits['speed-index'].displayValue,
  };

  console.log("\n⏱ Métricas de Performance:");
  console.table(metrics);

  await chrome.kill();
})();
