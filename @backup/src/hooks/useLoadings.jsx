import { useState } from 'react'

const useLoadings = (initial = {}) => {
  const [loading, setLoading] = useState(initial)

  function changeLoading(changedByKeys) {
    setLoading((current) => {
      return Object.keys(current)
        .filter((key) => Object.keys(changedByKeys).find((k) => k === key))
        .reduce(
          (updated, key) => {
            updated[key] = changedByKeys[key]
            return updated
          },
          { ...current }
        )
    })
  }

  return { loading, changeLoading }
}

export default useLoadings
