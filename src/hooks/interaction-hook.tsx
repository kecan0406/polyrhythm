import React, { createContext, useContext, useMemo, useState } from 'react'
import { CanvasInteraction, ControllerInteraction, Interaction } from '../types/canvas-types'

type InteractionAction = {
  canvasInteraction: (value: CanvasInteraction) => void
  controllerInteraction: (value: ControllerInteraction) => void
}
const InteractionValueContext = createContext<Interaction>(null)
const InteractionActionContext = createContext<InteractionAction>({
  canvasInteraction: () => {},
  controllerInteraction: () => {},
})

export const InteractionProvider = ({ children }: { children: React.ReactNode }) => {
  const [interaction, setInteraction] = useState<Interaction>(null)

  const actions: InteractionAction = useMemo(
    () => ({
      canvasInteraction(value: CanvasInteraction) {
        setInteraction(value)
      },
      controllerInteraction(value: ControllerInteraction) {
        setInteraction(value)
      },
    }),
    [],
  )

  return (
    <InteractionActionContext.Provider value={actions}>
      <InteractionValueContext.Provider value={interaction}>{children}</InteractionValueContext.Provider>
    </InteractionActionContext.Provider>
  )
}

export const useInteractionValue = () => useContext(InteractionValueContext)

export const useInteractionActions = () => useContext(InteractionActionContext)
