import { Text } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import { ITypeNativeInfo } from "@main/controllers"

export const TypeLabel = observer(({ info, isEdit }: { info: ITypeNativeInfo; isEdit: boolean }) => {
  const { label, avatar } = info
  const { color } = avatar

  return (
    <Text
      sx={{
        fontWeight: 600,
        fontSize: "xs",
        color: `${color}.600`,
        bg: !isEdit ? `${color}.200` : "",
        px: 2,
        py: 1,
        transitionDuration: "normal",
      }}
      rounded="lg"
    >
      {label}
    </Text>
  )
})
