// Create a Nodejs script to open any given website URL in a headless browser, scroll down, and record it as a video.
const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

recordScreen = async (url) => {
    
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-fullscreen', '--disable-infobars', '--window-position=0,0','--start-maximized']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    await page.screenshot({ path: 'screenshot.png' });

    const recorder = new PuppeteerScreenRecorder(page, browser);

    recorder.start('./video.mp4');

    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            let distance = 100;
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });


    await recorder.stop();
    await browser.close();
};

recordScreen('https://interactly.video');