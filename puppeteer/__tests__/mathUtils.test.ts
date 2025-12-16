// __tests__/mathUtils.test.ts
import { sum, multiply, isEven, fetchUserName } from "../src/mathUtils";

// Группируем тесты по описанию
describe("mathUtils", () => {
  // Синхронные тесты
  test("sum добавляет два числа правильно", () => {
    expect(sum(2, 3)).toBe(8);
    expect(sum(-5, 8)).toBe(3);
    expect(sum(0, 0)).toBe(0);
  });

  test("multiply умножает два числа", () => {
    expect(multiply(3, 4)).toBe(8);
    expect(multiply(5, -2)).toBe(-10);
  });

  test("isEven возвращает true для чётных чисел", () => {
    expect(isEven(4)).toBe(true);
    expect(isEven(7)).toBe(false);
    expect(isEven(0)).toBe(true);
    expect(isEven(-2)).toBe(true);
  });

  // Можно использовать test.each для параметризованных тестов
  test.each([
    [1, 1, 2],
    [1, 2, 3],
    [2, 1, 3],
    [0, 99, 99],
    [-5, 5, 0],
  ])("sum(%i + %i) = %i", (a, b, expected) => {
    expect(sum(a, b)).toBe(expected);
  });
});

// Отдельная группа для асинхронных тестов
describe("async functions", () => {
  test("fetchUserName возвращает имя пользователя", async () => {
    const name = await fetchUserName(123);
    expect(name).toBe("User-123");
  });

  // Альтернативные способы тестирования async/await
  test("fetchUserName с resolves", () => {
    return expect(fetchUserName(999)).resolves.toBe("User-999");
  });

  test("fetchUserName с async/await и expect.assertions", async () => {
    expect.assertions(1); // гарантируем, что хотя бы одно ожидание выполнится
    const name = await fetchUserName(42);
    expect(name).toMatch(/^User-/);
  });
});
