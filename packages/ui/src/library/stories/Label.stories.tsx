import { tailwindColors } from "@ui/theme/colors"
import { Box } from "@chakra-ui/react"
import { Label } from "../Label"
import { extractArgTypes } from "@utils/chakra-enhance"

const Template = ({ label, ...rest }) => <Label {...rest}>{label}</Label>

export const Primary = Template.bind({})

export const WithCustomSX = Template.bind({})
WithCustomSX.args = { sx: { fontSize: 20 } }

export default {
  title: "Library/Common/Label",
  args: { label: "Testing!" },
  argTypes: {
    colorScheme: {
      control: { type: "select", options: Object.keys(tailwindColors) },
      defaultValue: "blueGray",
    },
    ...extractArgTypes(Label),
  },
  decorators: [(Story) => <Box sx={{ bg: "white", p: 4 }}>{Story()}</Box>],
}
