import { observer } from "mobx-react-lite"
import { Label } from "@ui/library"
import { BlockState } from "./use-block-state"
import { ILogicInterfaceModel, ILogicNodeModel } from "@main/controllers"
import { createMotionBox, createBox, createFlex } from "@ui/utils/hoc"

export type IOType = "in" | "out"

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

const BlockWrapper = createMotionBox({
  baseStyle: {
    bg: "blueGray.200",
    borderRadius: "lg",
    overflow: "hidden",
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

const BlockIOWrapper = createBox({
  baseStyle: { bg: "blueGray.100", position: "relative", display: "flex", flexDir: "column" },
  variants: {
    in: { mr: 2, borderRightRadius: "lg", alignItems: "flex-start", mb: 2 },
    out: { ml: 2, borderLeftRadius: "lg", alignItems: "flex-end" },
  },
})

export const BlockNode = observer(({ node }: { node: ILogicNodeModel; ioType: IOType }) => {
  const { label } = node

  return (
    <BlockNodeWrapper>
      <Label size="xs">{label}</Label>
    </BlockNodeWrapper>
  )
})

const BlockNodeWrapper = createFlex({ baseStyle: { alignItems: "center", h: 7 } })