IONode add delete reorder

Block Node Connectors Shadows

create createMotionBox -> resolve style animate variants whilehover etc... styles to chakra theme style using css(style)(theme)

BUG onHoverStart onHoverEnd triggers when drag (only on chrome)

-> will automatically call toJSON if need to ipc
-> have all complex types be initialized with base class Serializable
-> can check if need to call toJSON if instanceof Serializable

1. just load all with loaded controllers

- make basic runner work
- basic UI

2. get cache system working
3. get async logic loading working

update connectionStore with MergeDeepMap class

logicController / typeController can have separate store -> mst and getter functions class mobx computed
-> have separate cache store for info / comp / detail
-> getter -> mobx class that computed values links all 3 together

## Open Source Contribute

chakra
typescript optimization
useStyleConfig closure instead -> move config out of theme

optimize -> useMemo is useless there

framerMotion -> custom don't forward props motion props

//BUG: FramerMotion drag is used with onHoverStart onHoverEnd, make sure drag is tied to Hover or else it will stutter
