import puppeteer, { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { delay } from "../src/delay";
let browser: Browser;
let page: Page;
describe("Тесты регистрации", () => {
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false, // false — если хочешь видеть браузер
            args: ["--no-sandbox", "--disable-setuid-sandbox"], //  "--start-maximized"
            // slowMo: 100,         // раскомментируй для дебага
            // true или "new" — без графического интерфейса (быстрее и для сервера)
            slowMo: 10, // замедляет действия на 100 мс (чтобы видеть, что происходит)
            defaultViewport: null, // убирает фиксированный размер окна (будет полноэкранный)
            devtools: true,
        });
    });
    beforeEach(async () => {
        page = await browser.newPage();
    });

    test("Успешная регистрация с валидными данными", async () => {
        await page.goto("https://test-5570x.soundl.ink/sign-in");
        await page.click(".page-login__forgot-text");
        await page.type(".input__field", "chepurina@soundl.ink");
        const button = await page.$(".button_type-gradient");
        if (button) {
            await button.click();
        }
        const page1 = await browser.newPage();
        await page1.goto("https://mail.google.com/mail/u/1/#inbox");
        await page1.type("#identifierId", "chepurina@soundl.ink");
        await page1.waitForSelector("#identifierNext", { visible: true });
        await page1.click("#identifierNext");
        await delay(6000);
        await page1.type('input[type="password"]', "WdPkBWK9ehG&VJvbn$tZ");
        await page1.click("#passwordNext");
        await page1.waitForNavigation({
            waitUntil: "networkidle2",
            timeout: 30000,
        });
        await page1.waitForSelector('input[aria-label="Поиск в почте"]', {
            visible: true,
            timeout: 20000,
        }); // проверка, что inbox загружен

        // Теперь переход на поиск от no-reply@soundl.ink (используем page1!)
        await page1.goto(
            "https://mail.google.com/mail/u/1/#search/from%3A(no-reply%40soundl.ink)",
            {
                waitUntil: "networkidle2",
                timeout: 30000, // Увеличили до 30 сек
            },
        );
        /* await page.goto("https://tmailor.com/ru/#welcomebox");


        const inputEmailEl = await page.waitForSelector('input[type="email"]', {
          visible: true,
          timeout: 15000,
        });
        if (!inputEmailEl) {
          throw "инпут не найден";
        }
        await delay(6000);
        const inputEmailValue = await inputEmailEl.evaluate(
          (el: HTMLInputElement) => {
            return el.value;
          },
        );
        if (!inputEmailValue) {
          throw "почта не получена";
        }
        console.log(inputEmailValue);

        const page1 = await browser.newPage();
        await page1.goto("https://test-5570x.soundl.ink");
        const buttons = await page1.$$(".button_text-color-white");
        console.log(1, buttons);
        await buttons[0].click();
        const inputs = await page1.$$(".input__field");
        console.log(1, inputs);
        await inputs[0].type(inputEmailValue);
        await inputs[1].type("usertest");
        await inputs[2].type("testpasword");
        await inputs[3].type("testpasword");
        await page1.click(".dark .button_type-gradient");
        await delay(2000);
        await page1.click(".user-menu");
        await page1.click(".user-menu__item_log-out");
        await page1.click(".page-login__forgot-text");
        const element = await page1.$(".dark .input__field");
        if (element) {
          element.type(inputEmailValue);
        }
        const button = await page1.$(".button_type-gradient");
        if (button) {
          await button.click();
        }
        await page.bringToFront();
        await delay(6000);*/
        // await page.click("#click-to-refresh");
        /* const message = await page.$(".message");
        expect(Boolean(message)).toBe(true);*/
    });
});
