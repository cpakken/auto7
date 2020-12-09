import { observer } from "mobx-react-lite"
import { ILogicInterface } from "@main/controllers"
import { Flex } from "@ui/common"
import { chakraExtend } from "@utils/chakra-enhance"
import { useIOState, IOContext, IOState, IOType } from "./use-io-state"
import { IONode } from "./IONode"

const IOWrapper = chakraExtend(Flex, {
  baseStyle: {
    bg: "coolGray.50",
    w: 140,
    px: 3,
    h: "100%",
    position: "absolute",
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
