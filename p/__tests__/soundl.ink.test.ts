import puppeteer, { Browser, Page } from "puppeteer";
import { delay } from "../src/delay";

let browser: Browser;
let page: Page;

describe("Sound link", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // false — если хочешь видеть браузер
      args: ["--no-sandbox", "--disable-setuid-sandbox"], //  "--start-maximized"
      // slowMo: 100,         // раскомментируй для дебага
      // true или "new" — без графического интерфейса (быстрее и для сервера)
      slowMo: 100, // замедляет действия на 100 мс (чтобы видеть, что происходит)
      // // defaultViewport: null, // убирает фиксированный размер окна (будет полноэкранный)
      devtools: true,
    });
  });

  afterAll(async () => {
    // if (browser) {
    //   await browser.close();
    // }
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    // await page.close();
  });

  test(`епта тест`, async () => {
    // 1. Открываем Google
    await page.goto("https://test-5570x.soundl.ink", {});

    console.log(1);
    // Ждём, пока кнопка точно появится в DOM
    const button = await page.waitForSelector(".button_text-color-white", {
      visible: true, // ждём, пока она будет видимая
      timeout: 5_000, // максимум 30 секунд
    });
    if (!button) return;

    await button.evaluate((el) =>
      el.scrollIntoView({ block: "center", behavior: "smooth" }),
    );

    await delay(1000);
    console.log(2);
    // Делаем клик
    await page.click(".button_text-color-white");

    // const text = await btn.evaluate(el => el.innerText);
    // const buttonsData = await page.evaluate(sel => {}
    const inputs = await page.$$("input.input__field");

    if (inputs.length > 0) {
      await inputs[0].click(); // фокус
      // await inputs[0].evaluate((el) => (el.value = "")); // очистить
      await inputs[0].type("test123@example.com", { delay: 100 }); // с небольшой задержкой

      const emailValue = await inputs[0].evaluate((el) => el.value);
      expect(emailValue).toBe("test123@example.com");
    }
    // await page.type('textarea[name="q"], input[name="q"]', SEARCH_QUERY);
  }, 45_000); // увеличенный таймаут — поиск + переход могут занять время
});
