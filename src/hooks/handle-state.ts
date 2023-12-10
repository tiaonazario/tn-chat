export const useHandleState = <T extends { id: string }>() => {
  const findStateById = (id: string, states: T[]) => {
    return states.find((state) => state.id === id) || null
  }

  const removeStateById = (id: string, states: T[]) => {
    return states.filter((state) => state.id !== id)
  }

  const removeStates = (ids: string[], states: T[]) => {
    return states.filter((state) => !ids.includes(state.id))
  }

  const replaceState = (newState: T, states: T[]) => {
    return states.map((state) => (state.id === newState.id ? newState : state))
  }

  return {
    findStateById,
    removeStateById,
    removeStates,
    replaceState,
  }
}
