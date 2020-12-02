import { computed } from "mobx"
import { IBlockComposed, IBlockNative, IBlock, ILogicComposition, isBlockComposed } from "@main/controllers"
import { Stream, StreamRemap, StreamNative, StreamNull } from "."
import { createTransformer } from "smartmap"

export abstract class BlockRunner {
  parent: CompositionRunner

  ins: StreamRemap
  block: IBlock
  abstract readonly outs: Stream

  constructor(block: IBlock, parent: CompositionRunner) {
    this.parent = parent
    this.block = block
    this.ins = new StreamRemap(block.inputs, parent)
  }
}

export class ComposedRunner extends BlockRunner {
  block: IBlockComposed

  @computed get runner() {
    const { composition } = this.block.logic
    return composition && new CompositionRunner(this.ins, composition)
  }

  @computed get outs() {
    return this.runner ? this.runner.outs : StreamNull
  }
}

export class NativeRunner extends BlockRunner {
  block: IBlockNative

  @computed get outs() {
    const { module } = this.block.logic
    return module ? new StreamNative(this.ins, module) : StreamNull
  }
}

export class CompositionRunner {
  logic: ILogicComposition
  ins: Stream
  outs: Stream

  getBlock: (block: IBlock) => BlockRunner

  constructor(stream: Stream, composition: ILogicComposition) {
    this.logic = composition
    this.ins = stream

    this.getBlock = createTransformer((block: IBlock) => {
      return isBlockComposed(block) ? new ComposedRunner(block, this) : new NativeRunner(block, this)
    })

    this.outs = new StreamRemap(this.logic.outputs, this)
  }
}
