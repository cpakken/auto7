import { observer } from "mobx-react-lite"
import { Label, NodeConnector } from "@ui/library"
import { createBox } from "@ui/utils/hoc"
import { gridSize } from "./use-block-state"
import { BlockNodeState } from "./use-block-node-state"

export const BlockNode = observer(({ state }: { state: BlockNodeState }) => {
  const { ioType } = state
  const { label } = state.node

  return (
    <BlockNodeContainer>
      <PositionZeroHeight variant={ioType}>
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
    w: "full",
    h: gridSize,
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
