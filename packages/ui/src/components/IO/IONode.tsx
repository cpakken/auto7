import { observer, useLocalObservable } from "mobx-react-lite"
import { ILogicNode } from "@main/controllers"
import { useScaleBoxShadowValues } from "@ui/utils"
import { useParentIOState } from "./use-io-state"
import { MotionFlex } from "@ui/common"
import { NodeLabel } from "./NodeLabel"
import { TypeLabel } from "./TypeLabel"
import { NodeConnector } from "./NodeConnector"

export const IONode = observer(({ node }: { node: ILogicNode }) => {
  const { type } = node
  const { ioType, isEdit } = useParentIOState()
  const { isFocus, onFocus, onBlur, isHover, onHoverStart, onHoverEnd } = useIONodeState()

  const { boxShadow, scale } = useScaleBoxShadowValues()

  return (
    <MotionFlex
      position="relative"
      direction="column"
      justifyContent="center"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      animate={{ scale: isHover || isFocus ? 1.06 : 1 }}
      style={{ scale }}
    >
      <MotionFlex
        sx={{ bg: "blueGray.200", h: "75px", w: "100%", px: 2, borderRadius: "lg", zIndex: "docked" }}
        direction="column"
        justify="center"
        align="center"
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ boxShadow }}
      >
        <NodeLabel node={node} isEdit={isEdit} />
        <TypeLabel info={type!.info!} isEdit={isEdit} />
      </MotionFlex>
      <NodeConnector variant={ioType} style={{ boxShadow }} />
    </MotionFlex>
  )
})

function useIONodeState() {
  const state = useLocalObservable(() => ({
    isFocus: false,
    isHover: false,
    onFocus() {
      this.isFocus = true
    },
    onBlur() {
      this.isFocus = false
    },
    onHoverStart() {
      this.isHover = true
    },
    onHoverEnd() {
      this.isHover = false
    },
  }))

  return state
}
