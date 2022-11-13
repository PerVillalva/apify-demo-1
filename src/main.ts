/* eslint-disable quotes */
import { Actor } from "apify";
import { CheerioCrawler } from "crawlee";
import { router } from "./routes.js";

// Initialize the Apify SDK
await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new CheerioCrawler({
    proxyConfiguration,
    requestHandler: router,
});

await crawler.addRequests([
    "https://www.zappos.com/drinkware/.zso?t=drinkware",
]);

await crawler.run();

// Exit successfully
await Actor.exit();
