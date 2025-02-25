export function CONFIG() {
    return {
        url: 'https://rubeus.com.br',
        logLevel: 'info',
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
        throttlingMethod: 'simulate',
        emulatedFormFactor: 'desktop',
        disableStorageReset: false
    }
}