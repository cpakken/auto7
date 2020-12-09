const dropShadows = {
  md: "0 6px 2px rgba(0, 0, 0, 0.2)",
  none: "0 0px 0px rgba(0, 0, 0, 0)",
}

export function dropShadowFilter(key: string) {
  return `drop-shadow(${dropShadows[key]})`
}
