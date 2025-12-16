import puppeteer, { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { delay } from "../src/delay";
let browser: Browser;
let page: Page;
describe("Тесты авторизации", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // false — если хочешь видеть браузер
      args: ["--no-sandbox", "--disable-setuid-sandbox"], //  "--start-maximized"
      // slowMo: 100,         // раскомментируй для дебага
      // true или "new" — без графического интерфейса (быстрее и для сервера)
      slowMo: 10, // замедляет действия на 100 мс (чтобы видеть, что происходит)
      // // defaultViewport: null, // убирает фиксированный размер окна (будет полноэкранный)
      devtools: true,
    });
  });
  beforeEach(async () => {
    page = await browser.newPage();
  });

  test("Успешная автоизация с валидными данными", async () => {
    await page.goto("https://test-5570x.soundl.ink/sign-in");
    const inputs = await page.$$(".dark .input__field");
    await inputs[0].type("chepurinaapolina@gmail.com");
    await inputs[1].type("list8899");
    await page.click(".dark .button_type-gradient");
    await delay(2000);
    const url = page.url();
    expect(url).toBe("https://test-5570x.soundl.ink/create");
    console.log(url);
  });
  test("Не успешная автоизация с неверным паролем", async () => {
    await page.goto("https://test-5570x.soundl.ink/sign-in");
    const inputs = await page.$$(".dark .input__field");
    await inputs[0].type("chepurinaapolina@gmail.com");
    await inputs[1].type("неверныйпароль");
    await page.click(".dark .button_type-gradient");
    const errorBlockEl = await page
      .waitForSelector("text=Invalid username or password.", {
        timeout: 2000,
      })
      .catch(() => null);
    expect(errorBlockEl).not.toBeNull();
  });
});
