import { defineConfig } from "cypress";
import { getCode } from "./src/getCode";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
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
