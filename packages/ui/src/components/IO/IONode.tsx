import { observer, useLocalObservable } from "mobx-react-lite"
import { ILogicNode } from "@main/controllers"
import { useTheme } from "@chakra-ui/react"
import { motionEnhance } from "@utils/motion-enhance"
import { chakraEnhance } from "@utils/chakra-enhance"
import { useParentIOState } from "./use-io-state"
import { MotionFlex } from "@ui/common"
import { NodeLabel } from "./NodeLabel"
import { TypeLabel } from "./TypeLabel"

const NodeConnector = motionEnhance(
  chakraEnhance("div", {
    baseStyle: {
      bg: "coolGray.400",
      w: "60px",
      h: "25px",
      borderRadius: "full",
      position: "absolute",
      zIndex: "base",
    },
    variants: {
      in: { right: 0, transform: "translateX(50%)" },
      out: { left: 0, transform: "translateX(-50%)" },
    },
  })
)

export const IONode = observer(({ node }: { node: ILogicNode }) => {
  const { type } = node
  const { ioType, isEdit } = useParentIOState()
  const { isFocus, onFocus, onBlur, isHover, onHoverStart, onHoverEnd } = useIONodeState()

  const { shadows } = useTheme()
  const boxShadow = { animate: { boxShadow: isFocus || isHover ? shadows["md"] : shadows["none2"] } }

  return (
    <MotionFlex
      position="relative"
      direction="column"
      justifyContent="center"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      animate={isFocus || isHover ? { scale: 1.06 } : { scale: 1 }}
    >
      <MotionFlex
        sx={{ bg: "coolGray.200", h: "75px", w: "100%", px: 2, borderRadius: "lg", zIndex: "docked" }}
        direction="column"
        justify="center"
        align="center"
        onFocus={onFocus}
        onBlur={onBlur}
        {...boxShadow}
      >
        <NodeLabel node={node} isEdit={isEdit} />
        <TypeLabel info={type!.info!} isEdit={isEdit} />
      </MotionFlex>
      <NodeConnector variant={ioType} {...boxShadow} />
    </MotionFlex>
  )
})

function useIONodeState() {
  const state = useLocalObservable(() => ({
    isFocus: false,
    isHover: false,
    onFocus() {
      state.isFocus = true
    },
    onBlur() {
      state.isFocus = false
    },
    onHoverStart() {
      state.isHover = true
    },
    onHoverEnd() {
      state.isHover = false
    },
  }))

  return state
}
