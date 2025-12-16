import puppeteer, { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { delay } from "../src/delay";
let browser: Browser;
let page: Page;
function generateRandomString(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return "test" + result;
}
const emailGlobal = generateRandomString(10) + "@gmail.com";
describe("Тесты регистрации", () => {
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

  test("Успешная регистрация с валидными данными", async () => {
    await page.goto("https://test-5570x.soundl.ink/sign-up");
    const inputs = await page.$$(".dark .input__field");
    await inputs[0].type(emailGlobal);
    await inputs[1].type("user");
    await inputs[2].type("list8899");
    await inputs[3].type("list8899");
    await page.click(".dark .button_type-gradient");
    await delay(2000);
    const url = page.url();
    expect(url).toBe("https://test-5570x.soundl.ink/create");
    console.log(url);
  });
  test("Не успешная с не повторяющимся паролем", async () => {
    const email = generateRandomString(10) + "@gmail.com";
    await page.goto("https://test-5570x.soundl.ink/sign-up");
    const inputs = await page.$$(".dark .input__field");
    await inputs[0].type(email);
    await inputs[1].type("user");
    await inputs[2].type("list8899");
    await inputs[3].type("list87675");
    await page.click(".dark .button_type-gradient");
    const errorBlockEl = await page
      .waitForSelector("text=Passwords do not match, please retype.", {
        timeout: 2000,
      })
      .catch(() => null);
    expect(errorBlockEl).not.toBeNull();
  });
  test("Не успешная с уже зарегистрированным email", async () => {
    await page.goto("https://test-5570x.soundl.ink/sign-up");
    const inputs = await page.$$(".dark .input__field");
    await inputs[0].type(emailGlobal);
    await inputs[1].type("user");
    await inputs[2].type("list8899");
    await inputs[3].type("list8899");
    await page.click(".dark .button_type-gradient");
    const errorBlockEl = await page
      .waitForSelector("text=User already exists", {
        timeout: 2000,
      })
      .catch(() => null);
    expect(errorBlockEl).not.toBeNull();
  });
});
