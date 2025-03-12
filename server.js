import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API is running successfully',
        timestamp: new Date().toISOString()
    });
});

app.post('/generate-report', async (req, res) => {
    const { url, categories = ['performance', 'accessibility', 'best-practices', 'seo'], logLevel = 'info' } = req.body;

    if (!url) {
        return res.status(400).json({ success: false, message: 'URL is required' });
    }

    try {
        const chrome = await chromeLauncher.launch({
            chromePath: process.env.CHROME_PATH,
            chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
        });
        const options = {
            logLevel,
            output: 'json',
            onlyCategories: categories,
            throttlingMethod: 'simulate',
            emulatedFormFactor: 'desktop',
            disableStorageReset: false,
            port: chrome.port,
        };

        const runnerResult = await lighthouse(url, options);
        const report = runnerResult.lhr;

        // Extraindo os dados necessários
        const extractedData = {
            timestamp: new Date().toISOString(),
            scores: {
                performance: report.categories.performance.score * 100,
                accessibility: report.categories.accessibility.score * 100,
                bestPractices: report.categories['best-practices'].score * 100,
                seo: report.categories.seo.score * 100,
                pwa: report.categories.pwa ? report.categories.pwa.score * 100 : "N/A"
            },
            metrics: {
                FCP: report.audits['first-contentful-paint'].displayValue,
                LCP: report.audits['largest-contentful-paint'].displayValue,
                TBT: report.audits['total-blocking-time'].displayValue,
                CLS: report.audits['cumulative-layout-shift'].displayValue,
                TTI: report.audits['interactive'].displayValue,
                SpeedIndex: report.audits['speed-index'].displayValue
            }
        };

        // Criando diretório se não existir
        const logsDir = path.join(__dirname, 'logs');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir);
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const reportPath = path.join(logsDir, `lighthouse-report-${timestamp}.json`);

        fs.writeFileSync(reportPath, JSON.stringify(extractedData, null, 2));

        res.status(200).json({ success: true, message: 'Report generated successfully', reportPath, data: extractedData });

        await chrome.kill();
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ success: false, message: 'Error generating report' });
    }
});

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`)
});
