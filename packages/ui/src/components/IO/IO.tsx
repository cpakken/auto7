import { observer } from "mobx-react-lite"
import { ILogicInterface } from "@main/controllers"
import { FlexColumn } from "@ui/common/FlexColumn"
import { useIOState, IOContext, IOState } from "./use-io-state"
import { IONode } from "./IONode"

export const IO = observer(({ io, _state }: { io: ILogicInterface; _state?: IOState }) => {
  const state = _state ?? useIOState()

  return (
    <IOContext.Provider value={state}>
      <FlexColumn sx={{ bg: "coolGray.50", w: 140, px: 3, h: "100%" }}>
        {io.list.map((node) => (
          <IONode node={node} key={node._id} />
        ))}
      </FlexColumn>
    </IOContext.Provider>
  )
})
