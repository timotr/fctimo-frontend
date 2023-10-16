import { create } from 'zustand'

const useGlobalState = create((set) => ({
  actionBarTitle: "",
  actionBarButtons: {},
  setActionBarTitle: (title) => set({ actionBarTitle: title }),
  setActionBarButtons: (buttons) => set({ actionBarButtons: buttons }),
  addActionBarButton: (name, button) => set((state) => ({
    actionBarButtons: {
      ...state.actionBarButtons,
      [name]: button
    }
  })),
  removeActionBarButton: (name) => set((state) => {
    const buttons = { ...state.actionBarButtons }
    delete buttons[name]
    return { actionBarButtons: buttons }
  }),
}))

export default useGlobalState