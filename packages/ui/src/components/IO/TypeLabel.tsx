import { Text } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import { NodeState } from "./use-node-state"

// export const TypeLabel = observer(({ info, isEdit }: { info: ITypeNativeInfo; isEdit: boolean }) => {
export const TypeLabel = observer(({ state }: { state: NodeState }) => {
  const { label, avatar } = state.node.type!.info!
  const { isEdit } = state.io
  const { color } = avatar

  return (
    <Text
      sx={{
        fontWeight: 600,
        fontSize: "xs",
        color: `${color}.600`,
        bg: !isEdit ? `${color}.200` : "",
        px: 2,
        py: 1,
        transitionDuration: "normal",
      }}
      rounded="lg"
    >
      {label}
    </Text>
  )
})
