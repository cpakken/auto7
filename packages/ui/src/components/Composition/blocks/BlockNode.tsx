import { observer } from "mobx-react-lite"
import { Label, NodeConnector } from "@ui/library"
import { ILogicNodeModel } from "@main/controllers"
import { createBox } from "@ui/utils/hoc"
import { IOType } from "./BlockContent"
import { useBlockNodeState } from "./use-block-node-state"

export const BlockNode = observer(({ node, ioType }: { node: ILogicNodeModel; ioType: IOType }) => {
  const { ref } = useBlockNodeState(ioType, node)
  const { label } = node

  return (
    <BlockNodeContainer>
      <PositionZeroHeight ref={ref} variant={ioType}>
        <BlockContent>
          <Label size="xs">{label}</Label>
        </BlockContent>
        <NodeConnector variant={ioType === "in" ? "left" : "right"} size="sm" />
      </PositionZeroHeight>
    </BlockNodeContainer>
  )
})

const BlockNodeContainer = createBox({
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    h: 7,
    w: "full",
  },
})

const PositionZeroHeight = createBox({
  baseStyle: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    w: "full",
  },
  variants: {
    in: { justifyContent: "flex-start" },
    out: { justifyContent: "flex-end" },
  },
})

const BlockContent = createBox({
  baseStyle: {
    position: "absolute",
    px: 2,
  },
})
