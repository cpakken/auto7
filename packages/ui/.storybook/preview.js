import { StorybookDecorator } from "../src/theme"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: { page: null },
  backgrounds: { default: "dark" },
  controls: { hideNoControlsWarning: true },
}

export const decorators = [StorybookDecorator]
