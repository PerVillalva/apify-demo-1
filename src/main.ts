import { Actor } from 'apify';
import { CheerioCrawler, ProxyConfigurationOptions } from 'crawlee';
import { router } from './routes.js';

// Initialize the Apify SDK
await Actor.init();

// Provide the actor with a search query
interface Input {
    search: string;
    proxyConfig: ProxyConfigurationOptions;
}
const {
    search,
    proxyConfig = {
        useApifyProxy: true,
    },
} = (await Actor.getInput()) as Input;

const proxyConfiguration = await Actor.createProxyConfiguration(proxyConfig);

const crawler = new CheerioCrawler({
    proxyConfiguration,
    requestHandler: router,
});

// Add initial request based on the provided search query
await crawler.addRequests([
    `https://www.zappos.com/${search
        .trim()
        .replace(' ', '-')}/.zso?t=${encodeURIComponent(search.trim())}&p=0`,
]);

await crawler.run();

// Exit successfully
await Actor.exit();
