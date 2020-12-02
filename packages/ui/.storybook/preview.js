import { StorybookDecorator } from "../src/theme"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [StorybookDecorator]
