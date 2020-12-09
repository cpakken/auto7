import { StorybookDecorator } from "../src/theme"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: { page: null },
  backgrounds: { default: "dark" },
  controls: { hideNoControlsWarning: true },
  options: { storySort: { order: ["UI", ["IO", "Composition", "Composer"], "Library"] } },
}

export const decorators = [StorybookDecorator]
