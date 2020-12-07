import { observer } from "mobx-react-lite"
import { ILogicNode } from "@main/controllers"
import { FlexColumn } from "@ui/common/FlexColumn"
import { useParentIOState } from "./use-io-state"
import { NodeLabel } from "./NodeLabel"
import { TypeLabel } from "./TypeLabel"

export const IONode = observer(({ node }: { node: ILogicNode }) => {
  const { type } = node
  const { isEdit } = useParentIOState().store

  return (
    <FlexColumn
      sx={{ bg: "coolGray.200", h: "75px", w: "100%", px: 2, fontSize: "sm" }}
      align="center"
      justify="center"
      rounded="lg"
    >
      <NodeLabel node={node} isEdit={isEdit} />
      <TypeLabel info={type!.info!} isEdit={isEdit} />
    </FlexColumn>
  )
})
