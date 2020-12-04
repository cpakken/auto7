import { Box, Input, Center } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import { useCallback, useContext } from "react"
import { ILogicNode } from "@main/controllers"
import { IOContext } from "./IO"

export const NodeLabel = observer(({ node }: { node: ILogicNode }) => {
  const { label } = node
  const { isEdit } = useContext(IOContext)
  const setLabel = useCallback((e) => node.setLabel(e.target.value), [])

  return (
    <Box sx={{ h: 7, marginBottom: 1 }}>
      {isEdit ? (
        <Input
          variant="filled"
          value={label}
          onChange={setLabel}
          rounded="lg"
          sx={{
            h: "100%",
            color: "coolGray.600",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "sm",
            px: 0,
            _focus: { bg: "coolGray.50" },
            _hover: { bg: "coolGray.300" },
            transition: "background-color 0.3s",
          }}
        />
      ) : (
        <Center
          sx={{
            color: "coolGray.600",
            h: "100%",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "sm",
          }}
        >
          {label}
        </Center>
      )}
    </Box>
  )
})
