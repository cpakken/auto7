import { observer } from "mobx-react-lite"
import { Label } from "@ui/library"
import { Box } from "@ui/common"
import { BlockState } from "./use-block-state"
import { ILogicInterfaceModel, ILogicNodeModel } from "@main/controllers"
import { createMotionChakraDiv, createChakraDiv } from "@ui/utils/hoc"

export type IOType = "in" | "out"

const BlockWrapper = createMotionChakraDiv({
  baseStyle: {
    bg: "blueGray.200",
    borderRadius: "lg",
    overflow: "hidden",
  },
})

export const BlockContent = observer(({ state }: { state: BlockState }) => {
  const { width, height } = state
  const { inputs, outputs, label } = state.block.logic.info!

  return (
    <BlockWrapper sx={{ width, height }}>
      <Label sx={{ h: 6 }} variant="center" size="xs">
        {label}
      </Label>
      <BlockInterface io={inputs} ioType="in" />
      <BlockInterface io={outputs} ioType="out" />
    </BlockWrapper>
  )
})

const BlockIOWrapper = createChakraDiv({
  baseStyle: { bg: "blueGray.100", position: "relative", mb: 1, display: "flex", flexDir: "column" },
  variants: {
    in: { mr: 2, borderRightRadius: "lg", alignItems: "flex-start" },
    out: { ml: 2, borderLeftRadius: "lg", alignItems: "flex-end" },
  },
})

export const BlockInterface = observer(({ io, ioType }: { io: ILogicInterfaceModel; ioType: IOType }) => {
  return (
    <BlockIOWrapper variant={ioType}>
      {io.list.map((node) => (
        <BlockNode key={node._id} node={node} ioType={ioType} />
      ))}
    </BlockIOWrapper>
  )
})

export const BlockNode = observer(({ node }: { node: ILogicNodeModel; ioType: IOType }) => {
  const { label } = node

  return (
    <Box sx={{ py: 1 }}>
      <Label size="xs">{label}</Label>
    </Box>
  )
})
