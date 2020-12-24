import { observer } from "mobx-react-lite"
import { Label } from "@ui/library"
import { BlockState } from "./use-block-state"
import { createMotionBox, createBox } from "@ui/utils/hoc"
import { BlockNode } from "./BlockNode"
import { BlockInterfaceState } from "./use-block-interface-state"

export type IOType = "in" | "out"

export const BlockContent = observer(({ state }: { state: BlockState }) => {
  const { width, height, inputs, outputs } = state
  const { label } = state.block.logic.info!

  return (
    <BlockWrapper sx={{ width, height }}>
      <Label h={6} variant="center" size="xs">
        {label}
      </Label>
      <BlockInterface io={inputs} />
      <BlockInterface io={outputs} />
    </BlockWrapper>
  )
})

const BlockWrapper = createMotionBox({
  baseStyle: {
    bg: "blueGray.200",
    borderRadius: "lg",
  },
})

export const BlockInterface = observer(({ io }: { io: BlockInterfaceState }) => {
  const { ioType } = io

  return (
    <BlockIOWrapper variant={ioType}>
      {io.list.map((node) => (
        <BlockNode key={node._id} state={node} />
      ))}
    </BlockIOWrapper>
  )
})

const BlockIOWrapper = createBox({
  baseStyle: {
    bg: "blueGray.100",
    display: "flex",
    flexDir: "column",
  },
  variants: {
    in: { mr: 2, borderTopRightRadius: "lg", alignItems: "flex-start" },
    out: { ml: 2, borderBottomLeftRadius: "lg", alignItems: "flex-end" },
  },
})
