import { observer } from "mobx-react-lite"
import { ILogicNode } from "@main/controllers"
import { useScaleBoxShadowValues } from "@ui/utils/use-scale-boxShadow"
import { useParentIOState } from "./use-io-state"
import { createMotionBox } from "src/utils/hoc"
import { NodeLabel } from "./NodeLabel"
import { TypeLabel } from "./TypeLabel"
import { NodeConnector } from "@ui/library"
import { NODE_CONTENT_HEIGHT, NODE_HEIGHT, NODE_WIDTH, useNodeState } from "./use-node-state"
import { useMotionDrag } from "src/utils/use-motion-drag/use-motion-drag"

export const Node = observer(({ node }: { node: ILogicNode }) => {
  const { type } = node
  const { ioType, isEdit, height } = useParentIOState()

  const state = useNodeState(node)
  const { isHover, isFocus, y } = state
  const { onHoverStart, onHoverEnd, onDragStart, onDragEnd, onDrag, onFocus, onBlur } = state

  const constraints = { y: { min: NODE_HEIGHT / 2, max: height! - NODE_HEIGHT / 2 } }
  const panHandlers = useMotionDrag({ y }, { onDragStart, onDragEnd, onDrag, constraints })

  const { boxShadow, scale } = useScaleBoxShadowValues(1.06)

  return (
    <NodeContainer
      // drag={isEdit && "y"}
      dragMomentum={false}
      style={{ scale, y }}
      animate={{ scale: isHover || isFocus ? 1.06 : 1 }}
      // animate={{ zIndex: isDrag ? 10 : 1 }}
      // whileHover={{ scale: 1.04 }}
      // whileTap={{ scale: isEdit ? 1.12 : 1.06 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onFocus={onFocus}
      onBlur={onBlur}
      {...(isEdit && panHandlers)}
    >
      <NodeContent style={{ boxShadow }}>
        <NodeLabel node={node} isEdit={isEdit} />
        <TypeLabel info={type!.info!} isEdit={isEdit} />
        <NodeConnector variant={ioType === "in" ? "right" : "left"} style={{ boxShadow }} />
      </NodeContent>
    </NodeContainer>
  )
})

const NodeContainer = createMotionBox({
  baseStyle: {
    position: "absolute",
    top: 0,
    w: "full",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})

const NodeContent = createMotionBox({
  baseStyle: {
    position: "absolute",
    // position: "relative",
    bg: "blueGray.200",
    // w: "full",
    w: NODE_WIDTH,
    h: NODE_CONTENT_HEIGHT,
    px: 2,
    borderRadius: "lg",
    display: "flex",
    flexDir: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "node",
  },
})
