import { ChangeEvent, useEffect, useRef, useCallback, KeyboardEvent } from "react"
import { observer, useLocalObservable } from "mobx-react-lite"
import { ILogicNode } from "@main/controllers"
import { Center, Box, Input } from "@chakra-ui/react"
import { useColor } from "@utils/chakra-utils"

function useNodeInputState(node: ILogicNode) {
  const ref = useRef<HTMLInputElement>(null)
  const state = useLocalObservable(() => ({
    value: node.label,
    get isValid() {
      return state.value.length > 0
    },
    onChange(e: ChangeEvent<HTMLInputElement>) {
      state.value = e.target.value
    },
  }))

  useEffect(() => {
    const setLabel = () => {
      if (state.isValid) node.setLabel(state.value)
      else state.value = node.label
    }
    ref.current!.onblur = setLabel
    return setLabel
  }, [])

  const onKeyDown = useCallback(({ key }: KeyboardEvent<HTMLInputElement>) => key === "Enter" && ref.current!.blur(), [ref])

  return { state, ref, onKeyDown }
}

export const NodeInput = observer(({ node }: { node: ILogicNode }) => {
  const { ref, state, onKeyDown } = useNodeInputState(node)
  const { value, onChange, isValid } = state
  const errorColor = useColor("rose")(400)

  return (
    <Input
      ref={ref}
      variant="unstyled"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      size="unstyled"
      aria-invalid={!isValid}
      sx={{ textAlign: "center", w: "full", h: "full", borderRadius: "md", transitionDuration: "normal", fontWeight: "bold" }}
      style={{ boxShadow: !isValid ? `0 0 0 2px ${errorColor}` : undefined }}
    />
  )
})

//TODO change Center bg and boxShadow instead of Input

export const NodeLabel = observer(({ node, isEdit }: { node: ILogicNode; isEdit: boolean }) => {
  const { label } = node
  const color = useColor("coolGray")

  return (
    <Center
      sx={{
        h: 7,
        w: "full",
        fontWeight: "bold",
        color: color(600),
        marginBottom: 1,
        borderRadius: "md",
        bg: isEdit ? color(100) : "transpsarent",
        transitionDuration: "normal",
        _hover: { bg: isEdit ? color(50) : "transparent" },
        _focusWithin: {
          bg: color(50),
          boxShadow: `0 0 0 2px ${useColor("violet")(400)}`,
        },
      }}
    >
      {isEdit ? <NodeInput node={node} /> : <Box>{label}</Box>}
    </Center>
  )
})
