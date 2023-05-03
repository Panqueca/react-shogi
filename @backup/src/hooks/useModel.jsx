import { useCallback, useRef, useState } from 'react'

export const useModelStatus = () => {
  const [status, setStatus] = useState(false)

  const setStatusModal = useCallback(() => setStatus((state) => !state), [])

  return [status, setStatusModal]
}

export const useModelName = () => {
  const modal = useRef(null)

  const clearModal = () => {
    modal.current = ' '
  }

  const setModal = (name) => {
    modal.current = name
  }

  return { clearModal, setModal, modal }
}
