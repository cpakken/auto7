import { ITypeComposedStoreSnapshotIn, TypeNativeSnapshotIn } from "@main/controllers/types"

// export function createLogicComposedStoreSnapshot(
//   snapshots: LogicComposedSnapshotIn | LogicComposedSnapshotIn[]
// ): ILogicComposedStoreSnapshotIn {
//   return (Array.isArray(snapshots) ? snapshots : [snapshots]).reduce(
//     (a, snapshot) => {
//       const { _id, info, composition } = snapshot
//       a.info.push({ _id, ...info })
//       a.composition.push({ _id, ...composition })
//       return a
//     },
//     { info: [] as any[], composition: [] as any[] }
//   )
// }

export function createTypeNativeStoreSnapshot(
  snapshots: TypeNativeSnapshotIn | TypeNativeSnapshotIn[]
): ITypeComposedStoreSnapshotIn {
  return (Array.isArray(snapshots) ? snapshots : [snapshots]).reduce(
    (a, snapshot) => {
      const { _id, info } = snapshot
      a.info.push({ _id, ...info })
      return a
    },
    { info: [] as any[] }
  )
}

// export function addIdsToSnapshot(snapshot: LogicComposedSnapshotIn) {
//   const { _id, info, composition } = snapshot
//   return {
//     _id,
//     info: { _id, ...info },
//     composition: { _id, ...composition },
//   }
// }
