import { observer } from "mobx-react-lite"
import { ILogicNode } from "@main/controllers"
import { useScaleBoxShadowValues } from "@ui/utils/use-scale-boxShadow"
import { useParentIOState } from "./use-io-state"
import { createMotionBox } from "src/utils/hoc"
import { NodeLabel } from "./NodeLabel"
import { TypeLabel } from "./TypeLabel"
import { NodeConnector } from "@ui/library"
import { NODE_HEIGHT, NODE_WIDTH, useNodeState } from "./use-node-state"

export const Node = observer(({ node }: { node: ILogicNode }) => {
  const { type } = node
  const { ioType, isEdit } = useParentIOState()
  const { ref, isFocus, isHover, isDrag, onFocus, onBlur, onHoverStart, onHoverEnd, onDragStart, onDragEnd, y } = useNodeState(
    node
  )

  const { boxShadow, scale } = useScaleBoxShadowValues(1.06)

  return (
    <NodeContainer
      ref={ref}
      // drag={isEdit && "y"}
      style={{ scale, y }}
      // animate={{ scale: isHover || isFocus ? 1.06 : 1 }}
      initial={false}
      animate={{ zIndex: isDrag ? 10 : 1 }}
      whileHover={{ scale: 1.04 }}
      // whileTap={{ scale: isEdit ? 1.12 : 1.06 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      // onFocus={onFocus}
      // onBlur={onBlur}
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
    // position: "relative",
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
    bg: "blueGray.200",
    // w: "full",
    w: NODE_WIDTH,
    h: NODE_HEIGHT,
    px: 2,
    borderRadius: "lg",
    display: "flex",
    flexDir: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "node",
  },
})
