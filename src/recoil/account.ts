import { atom } from "recoil";
import {useState} from "react";
import exp from "constants";

export const accountState = atom<string | null>({
  key: 'accountState',
  default: null
})


export const stepState = atom<'initial' | 'roleSelection'>({
  key: 'stepState',
  default: 'initial'
})

