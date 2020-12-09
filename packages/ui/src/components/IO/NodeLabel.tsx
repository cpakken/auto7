import { observer } from "mobx-react-lite"
import { ILogicNode } from "@main/controllers"
import { Center, Box, chakra } from "@chakra-ui/react"
import { useColor } from "@utils/chakra-utils"
import { useNodeInputState } from "./use-node-input-state"

export const NodeInput = observer(({ node }: { node: ILogicNode }) => {
  const { ref, value, onChange, isValid, onKeyDown, onBlur, onFocus } = useNodeInputState(node)
  const errorColor = useColor("rose")(400)

  return (
    <chakra.input
      ref={ref}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onFocus={onFocus}
      aria-invalid={!isValid}
      sx={{
        w: "full",
        h: 7,
        // h: "full",
        textAlign: "center",
        fontSize: "inherit",
        fontWeight: "inherit",
        borderRadius: "md",
        outline: "none",
        bg: "none",
        transitionDuration: "normal",
      }}
      _invalid={{ boxShadow: `0 0 0 2px ${errorColor}` }}
    />
  )
})

export const NodeLabel = observer(({ node, isEdit }: { node: ILogicNode; isEdit: boolean }) => {
  const { label } = node
  const color = useColor("coolGray")

  return (
    <Center
      sx={{
        w: "full",
        h: 7,
        marginBottom: 1,
        fontSize: "sm",
        fontWeight: "bold",
        color: color(600),
        bg: isEdit ? color(100) : "transpsarent",
        borderRadius: "md",
        transitionDuration: "normal",
      }}
      _hover={{ bg: isEdit ? "white" : "transparent" }}
      _focusWithin={{
        bg: "white",
        boxShadow: `0 0 0 2px ${useColor("violet")(400)}`,
      }}
    >
      {isEdit ? <NodeInput node={node} /> : <Box>{label}</Box>}
    </Center>
  )
})
