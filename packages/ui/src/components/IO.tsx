import { Text } from "@chakra-ui/react"
import { ILogicInterface, ILogicNode, ITypeNativeInfo } from "@main/controllers"
import { observer } from "mobx-react-lite"
import { FlexColumn } from "../common/FlexColumn"

const NodeLabel = ({ children }: { children: string }) => (
  <Text sx={{ color: "blueGray.600", fontWeight: 700, fontSize: 14 }}>{children}</Text>
)

const TypeLabel = ({ children }: { children: ITypeNativeInfo }) => {
  const { label } = children
  // const {  } = children.avatar

  return <Text sx={{ color: "blueGray.600", fontWeight: 700, fontSize: 14 }}>{label}</Text>
}

export const IONode = observer(({ node }: { node: ILogicNode }) => {
  const { label, type } = node

  return (
    <FlexColumn sx={{ bg: "blueGray.100", borderRadius: 8, h: "75px", w: "100%", p: 1 }} align="center">
      <NodeLabel>{label}</NodeLabel>
      <TypeLabel>{type!.info!}</TypeLabel>
    </FlexColumn>
  )
})

export const IO = observer(({ io }: { io: ILogicInterface }) => {
  return (
    <FlexColumn sx={{ bg: "blueGray.300", w: 140, h: 600, px: 3 }}>
      {io.list.map((node) => (
        <IONode node={node} key={node._id} />
      ))}
    </FlexColumn>
  )
})
