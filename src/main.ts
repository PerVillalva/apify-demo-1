/* eslint-disable quotes */
import { Actor } from "apify";
import { CheerioCrawler } from "crawlee";
import { router } from "./routes.js";

// Initialize the Apify SDK
await Actor.init();

// Provide the actor with a search query
const userInput = await Actor.getInput();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { search } = userInput;

const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new CheerioCrawler({
    proxyConfiguration,
    requestHandler: router,
});

// Add initial request based on the provided search query
await crawler.addRequests([
    `https://www.zappos.com/${search
        .trim()
        .replace(" ", "-")}/.zso?t=${encodeURIComponent(search.trim())}&p=0`,
]);

await crawler.run();

// Exit successfully
await Actor.exit();
