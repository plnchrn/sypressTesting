// src/mathUtils.ts
export function sum(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function isEven(n: number): boolean {
  return n % 2 === 0;
}

// Асинхронная функция (для примера)
export async function fetchUserName(userId: number): Promise<string> {
  // Имитация запроса к API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`User-${userId}`);
    }, 100);
  });
}
