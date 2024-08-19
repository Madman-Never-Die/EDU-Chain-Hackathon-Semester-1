import { atom } from "recoil";

export const roleState = atom<string | null>({
  key: 'roleState',
  default: null
})


