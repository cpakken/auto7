import colors from "src/theme/colors"
import { Box } from "@chakra-ui/react"
import { Label } from "./Label"

export default {
  title: "Common/Label",
  argTypes: {
    colorScheme: {
      control: { type: "select", options: Object.keys(colors) },
      defaultValue: "coolGray",
    },
  },
  decorators: [(Story) => <Box sx={{ bg: "white", p: 4 }}>{Story()}</Box>],
}

const Template = ({ label, ...rest }) => <Label {...rest}>{label}</Label>

export const Primary = Template.bind({})
Primary.args = { label: "Testing!" }
