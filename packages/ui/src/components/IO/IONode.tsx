import { observer } from "mobx-react-lite"
import { ILogicNode } from "@main/controllers"
import { useScaleBoxShadowValues } from "@ui/utils/use-scale-boxShadow"
import { useParentIOState } from "./use-io-state"
import { MotionCenter } from "@ui/common"
import { createMotionBox } from "src/utils/hoc"
import { NodeLabel } from "./NodeLabel"
import { TypeLabel } from "./TypeLabel"
import { NodeConnector } from "@ui/library"
import { useIONodeState } from "./use-io-node-state"

export const IONode = observer(({ node }: { node: ILogicNode }) => {
  const { type } = node
  const { ioType, isEdit } = useParentIOState()
  const { isFocus, onFocus, onBlur, isHover, onHoverStart, onHoverEnd } = useIONodeState(node)

  const { boxShadow, scale } = useScaleBoxShadowValues(1.06)

  return (
    <MotionCenter
      position="relative"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      animate={{ scale: isHover || isFocus ? 1.06 : 1 }}
      style={{ scale }}
    >
      <IONodeContainer onFocus={onFocus} onBlur={onBlur} style={{ boxShadow }}>
        <NodeLabel node={node} isEdit={isEdit} />
        <TypeLabel info={type!.info!} isEdit={isEdit} />
        <NodeConnector variant={ioType === "in" ? "right" : "left"} style={{ boxShadow }} />
      </IONodeContainer>
    </MotionCenter>
  )
})

const IONodeContainer = createMotionBox({
  baseStyle: {
    bg: "blueGray.200",
    w: "full",
    h: "75px",
    px: 2,
    borderRadius: "lg",
    display: "flex",
    flexDir: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "node",
    position: "relative",
  },
})
