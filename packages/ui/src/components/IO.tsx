import { Text } from "@chakra-ui/react"
import { observable } from "mobx"
import { observer } from "mobx-react-lite"
import { createContext, useContext } from "react"
import { ILogicInterface, ILogicNode, ITypeNativeInfo } from "@main/controllers"
import { FlexColumn } from "../common/FlexColumn"
import { NodeLabel } from "./NodeLabel"

export const IOContext = createContext(observable({ isEdit: false }))

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
        transition: "background-color 0.3s",
      }}
      rounded="lg"
    >
      {label}
    </Text>
  )
})

export const IONode = observer(({ node }: { node: ILogicNode }) => {
  const { type } = node

  return (
    <FlexColumn
      sx={{ bg: "coolGray.200", h: "75px", w: "100%", px: 2, fontSize: "sm" }}
      align="center"
      justify="center"
      rounded="lg"
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
