import { Text, Box, Input, Center } from "@chakra-ui/react"
import { observable } from "mobx"
import { observer } from "mobx-react-lite"
import { createContext, useCallback, useContext } from "react"
import { ILogicInterface, ILogicNode, ITypeNativeInfo } from "@main/controllers"
import { FlexColumn } from "../common/FlexColumn"

export const IOContext = createContext(observable({ isEdit: false }))

const NodeLabel = observer(({ node }: { node: ILogicNode }) => {
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
          sx={{
            h: "100%",
            color: "coolGray.500",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "sm",
            px: 0,
            _focus: { bg: "coolGray.50" },
            _hover: { bg: "coolGray.300" },
          }}
        />
      ) : (
        <Center
          sx={{
            color: "coolGray.500",
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

const TypeLabel = observer(({ info }: { info: ITypeNativeInfo }) => {
  const { label, avatar } = info
  const { color } = avatar
  const { isEdit } = useContext(IOContext)

  return (
    <Text
      sx={{
        fontWeight: 600,
        fontSize: "xs",
        color: `${color}.600`,
        bg: !isEdit ? `${color}.200` : "",
        px: 2,
        py: 1,
        borderRadius: 10,
      }}
    >
      {label}
    </Text>
  )
})

export const IONode = observer(({ node }: { node: ILogicNode }) => {
  const { type } = node

  return (
    <FlexColumn
      sx={{ bg: "coolGray.200", borderRadius: 10, h: "75px", w: "100%", px: 2, fontSize: "sm" }}
      align="center"
      justify="center"
    >
      <NodeLabel node={node} />
      <TypeLabel info={type!.info!} />
    </FlexColumn>
  )
})

export const IO = observer(({ io }: { io: ILogicInterface }) => {
  return (
    <FlexColumn sx={{ bg: "coolGray.50", w: 140, px: 3, h: "100%" }}>
      {io.list.map((node) => (
        <IONode node={node} key={node._id} />
      ))}
    </FlexColumn>
  )
})
