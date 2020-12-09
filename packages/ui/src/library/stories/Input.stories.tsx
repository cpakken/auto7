import { Box } from "@chakra-ui/react"
import { Input } from "../Input"

export default {
  title: "Library/Common/Input",
  args: {
    value: "Sample input",
  },
  decorators: [(Story) => <Box sx={{ bg: "coolGray.400", p: 4 }}>{Story()}</Box>],
}

export const Default = (props) => <Input {...props} />
