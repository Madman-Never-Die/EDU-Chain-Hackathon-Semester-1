import { atom } from "recoil";



export const roleState = atom<"User" | "Quest Provider" | "Protocol Provider" | null>({
  key: 'roleState',
  default: null
})


