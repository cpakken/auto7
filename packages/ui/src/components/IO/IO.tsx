import { observer } from "mobx-react-lite"
import { ILogicInterface } from "@main/controllers"
import { Flex } from "@ui/common"
import { chakraExtend } from "@utils/chakra-enhance"
import { useIOState, IOContext, IOState, IOType } from "./use-io-state"
import { IONode } from "./IONode"

const IOWrapper = chakraExtend(Flex, {
  baseStyle: {
    bg: "blueGray.50",
    // bg: "blueGray.700",
    w: 140,
    h: "100%",
    px: 3,
    position: "absolute",
    userSelect: "none",
    top: 0,
  },
  defaultProps: {
    direction: "column",
    justify: "space-around",
  },
  variants: {
    in: { left: 0 },
    out: { right: 0 },
  },
})

export const IO = observer(({ io, ioType, _state }: { io: ILogicInterface; ioType: IOType; _state?: IOState }) => {
  const state = _state ?? useIOState(ioType)

  return (
    <IOContext.Provider value={state}>
      <IOWrapper variant={ioType}>
        {io.list.map((node) => (
          <IONode node={node} key={node._id} />
        ))}
      </IOWrapper>
    </IOContext.Provider>
  )
})
