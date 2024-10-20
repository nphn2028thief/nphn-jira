import { create } from "zustand";

interface IModalState {
  visible: boolean;
  id: string;
  isClose: boolean;
  setVisible: (visible: boolean) => void;
  setId: (id: string) => void;
  setClose: (isClose: boolean) => void;
}

const useModalStore = create<IModalState>()((set) => ({
  visible: true,
  id: "",
  isClose: false,
  setVisible: (visible) => set(() => ({ visible })),
  setId: (id) => set(() => ({ id })),
  setClose: (isClose) => set(() => ({ isClose })),
}));

export default useModalStore;
