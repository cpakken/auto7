- change @/_ to @main/_
- reorganize utils
  - make mst folder
  - helpers -> common
  - react - hooks

-> LogicModule type -> outs functions no longer need typeKey
-> just have the function return a class with a serialize or toJSON function
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
