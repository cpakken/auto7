import { computed } from "mobx"
import { TaskCombined } from "./Queue"
import { IOType } from "@main/controllers/types"
import { LogicFn } from "@main/controllers/logic"

export enum TaskStatus {
  SUCCESS,
  PENDING,
  FAILED,
  NULL,
  LOGICLOAD,
}
export type TaskSnapshot = { val: any } | { s: null }

export interface Task<V = any> {
  readonly val: V
  readonly status: TaskStatus
  readonly snapshot: TaskSnapshot
}

export class TaskProducer<V = any> implements Task<V> {
  val: V

  constructor(data: V, type: IOType) {
    this.val = data
  }

  get status() {
    return TaskStatus.SUCCESS
  }

  get snapshot() {
    return { val: this.val }
  }
}

export type ITaskSyncConfig = {
  tasks: TaskCombined
  fn: LogicFn
}

export class TaskSync<V> implements Task<V> {
  config: ITaskSyncConfig

  constructor(config: ITaskSyncConfig) {
    this.config = config
  }

  @computed get val() {
    const { tasks, fn } = this.config
    return fn(tasks.map((task) => task.val))
  }

  @computed get status() {
    return this.val !== null ? TaskStatus.SUCCESS : TaskStatus.NULL
  }

  @computed get snapshot() {
    return this.status === TaskStatus.SUCCESS ? { val: this.val } : { s: null }
  }
}

export class TaskNull implements Task<null> {
  val = null
  status = TaskStatus.NULL
  snapshot: { s: null }
}

export const taskNull = new TaskNull()
