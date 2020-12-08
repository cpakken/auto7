import { observer, useLocalObservable } from "mobx-react-lite"
import { ILogicNode } from "@main/controllers"
import { useParentIOState } from "./use-io-state"
import { NodeLabel } from "./NodeLabel"
import { TypeLabel } from "./TypeLabel"
import { Flex, useTheme } from "@chakra-ui/react"
import { motionEnhance } from "@utils/motion-enhance"

function useIONodeState() {
  const state = useLocalObservable(() => ({
    isFocus: false,
    onFocus() {
      state.isFocus = true
    },
    onBlur() {
      state.isFocus = false
    },
  }))

  return state
}

const MotionFlex = motionEnhance(Flex)

export const IONode = observer(({ node }: { node: ILogicNode }) => {
  const { type } = node
  const { isEdit } = useParentIOState()
  const { isFocus, onFocus, onBlur } = useIONodeState()
  const { shadows } = useTheme()

  return (
    <MotionFlex
      sx={{
        bg: "coolGray.200",
        h: "75px",
        w: "100%",
        px: 2,
        borderRadius: "lg",
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      direction="column"
      justify="center"
      align="center"
      animate={isFocus ? { scale: 1.05, boxShadow: shadows["lg"] } : { scale: 1 }}
      whileHover={{ scale: 1.05, boxShadow: shadows["lg"] }}
    >
      <NodeLabel node={node} isEdit={isEdit} />
      <TypeLabel info={type!.info!} isEdit={isEdit} />
    </MotionFlex>
  )
})
