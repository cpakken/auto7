import { observer } from "mobx-react-lite"
import { IOState } from "./use-io-state"
import { Node } from "./IONode"
import { createMotionBox } from "src/utils/hoc"

export const IO = observer(({ state }: { state: IOState }) => {
  const { ioType } = state

  return (
    <IOContainer variant={ioType} initial={{ opacity: 0, x: ioType === "in" ? -25 : 25 }} animate={{ opacity: 1, x: 0 }}>
      {state.list.map((node) => (
        <Node key={node._id} state={node} />
      ))}
    </IOContainer>
  )
})

const IOContainer = createMotionBox({
  baseStyle: {
    display: "flex",
    flexDir: "column",
    justifyContent: "space-around",
    position: "absolute",
    top: 0,
    w: 140,
    h: "100%",
    bg: "blueGray.100",
    userSelect: "none",
  },
  variants: {
    in: {
      left: 0,
      boxShadow: "3px 0 3px 1px rgba(0, 0, 0, 0.05)",
    },
    out: {
      right: 0,
      boxShadow: "-3px 0 3px 1px rgba(0, 0, 0, 0.05)",
    },
  },
})
