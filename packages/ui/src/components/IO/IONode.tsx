import { observer } from "mobx-react-lite"
import { ILogicNode } from "@main/controllers"
import { useScaleBoxShadowValues } from "@ui/utils/use-scale-boxShadow"
import { useParentIOState } from "./use-io-state"
import { MotionCenter } from "@ui/common"
import { createMotionBox } from "src/utils/hoc"
import { NodeLabel } from "./NodeLabel"
import { TypeLabel } from "./TypeLabel"
import { NodeConnector } from "@ui/library"
import { useNodeState } from "./use-node-state"

export const Node = observer(({ node }: { node: ILogicNode }) => {
  const { type } = node
  const { ioType, isEdit } = useParentIOState()
  const { ref, isFocus, isHover, isDrag, onFocus, onBlur, onHoverStart, onHoverEnd, onDragStart, onDragEnd } = useNodeState(node)

  const { boxShadow, scale } = useScaleBoxShadowValues(1.06)

  return (
    <MotionCenter
      ref={ref}
      position="relative"
      layout="position"
      drag={isEdit && "y"}
      style={{ scale }}
      // animate={{ scale: isHover || isFocus ? 1.06 : 1 }}
      initial={false}
      animate={{ zIndex: isDrag ? 10 : 1 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: isEdit ? 1.12 : 1.06 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      // onFocus={onFocus}
      // onBlur={onBlur}
    >
      <NodeContainer style={{ boxShadow }}>
        <NodeLabel node={node} isEdit={isEdit} />
        <TypeLabel info={type!.info!} isEdit={isEdit} />
        <NodeConnector variant={ioType === "in" ? "right" : "left"} style={{ boxShadow }} />
      </NodeContainer>
    </MotionCenter>
  )
})

const NodeContainer = createMotionBox({
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
