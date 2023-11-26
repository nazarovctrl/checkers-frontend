function getElData(el) {
  if (!el) return false
  const rect = el.getBoundingClientRect()
  const parentRect = el.parentElement.getBoundingClientRect()

  return {
    // size
    width: +rect.width.toFixed(0),
    height: +rect.height.toFixed(0),
    // position
    top: +(rect.top - parentRect.top).toFixed(0),
    right: +(rect.right - parentRect.left).toFixed(0),
    bottom: +(rect.bottom - parentRect.top).toFixed(0),
    left: +(rect.left - parentRect.left).toFixed(0),
  }
}

function getElFullData(el) {
  if (!el) return false
  const rect = el.getBoundingClientRect()

  return {
    // size
    width: +rect.width.toFixed(0),
    height: +rect.height.toFixed(0),
    // position
    top: +rect.top.toFixed(0),
    right: +rect.right.toFixed(0),
    bottom: +rect.bottom.toFixed(0),
    left: +rect.left.toFixed(0),
  }
}

export { getElData, getElFullData }
