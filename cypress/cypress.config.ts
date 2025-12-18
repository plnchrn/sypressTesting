import { defineConfig } from "cypress";
import { getCode } from "./src/getCode";
import { configureVisualRegression } from "cypress-visual-regression";

export default defineConfig({
  e2e: {
    env: {
      // visualRegressionType: "regression",
    },
    screenshotsFolder: "./cypress/snapshots/actual",

    setupNodeEvents(on, config) {
      // Сначала настраиваем visual regression
      configureVisualRegression(on);

      // Затем регистрируем свои tasks
      on("task", {
        getEmailCode: async () => {
          const code = await getCode();
          console.log(123, code);
          return code;
        },
      });

      return config;
    },
  },
});
