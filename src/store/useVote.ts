import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

type VoteState = {
  selection: "agree" | "disagree" | "";
  hasPreviouslySelected: boolean;
  setSelection: (selection: VoteState["selection"]) => void;
};

const createState: StateCreator<VoteState> = (set) => {
  return {
    selection: "",
    hasPreviouslySelected: false,
    setSelection: (selection) => {
      set({ selection, hasPreviouslySelected: true });
    },
  };
};

export const useVote = create(persist(createState, { name: "vote-selection" }));
