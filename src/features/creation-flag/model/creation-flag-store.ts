import { PRESET_COLORS } from "@/features/flag-color-picker";
import { create } from "zustand";

interface Category {
  name: string;
  id: string;
}

interface SelectedIcon {
  iconName: string | null;
  svgContent: string | null;
  iconId: string | null;
}

export interface FlagDraft {
  flagName: string;
  selectedColor: string;
  bgOpacity: number;
  selectedFont: string;
  selectedIcon: SelectedIcon | null;
  category: Category;
}

interface Ui {
  isCreatingNew: boolean;
  editingFlagId: string | null;
}

export type LastSnapshotFlag = Pick<Store, "flag" | "ui">;

interface Store {
  flag: FlagDraft;
  ui: Ui;

  presetColors: string[];
  addPresetColor: (color: string) => void;

  updateStateFlag: (data: Partial<Store["flag"]>) => void;
  updateStateUi: (data: Partial<Store["ui"]>) => void;

  lastSnapshotFlag: LastSnapshotFlag | null;
  cancelCreationFlag: () => void;
}

export const useCreationFlagStore = create<Store>((set) => {
  return {
    lastSnapshotFlag: null,

    flag: {
      flagName: "New flag",
      selectedColor: "rgba(139, 92, 246, 1)",
      bgOpacity: 0.38,
      selectedFont: "Manrope",
      selectedIcon: null,
      category: { name: "", id: "" },
    },

    ui: { isCreatingNew: false, editingFlagId: null },

    updateStateFlag: (data) => set((state) => ({ flag: { ...state.flag, ...data } })),

    updateStateUi: (data) => set((state) => ({ ui: { ...state.ui, ...data } })),

    presetColors: PRESET_COLORS,
    addPresetColor: (color) =>
      set((state) => ({
        presetColors:
          state.presetColors.includes(color) ? state.presetColors : [...state.presetColors, color],
      })),

    cancelCreationFlag: () =>
      set((state) => {
        setTimeout(() => {
          useCreationFlagStore.setState({ lastSnapshotFlag: null });
        }, 300);

        return {
          lastSnapshotFlag: {
            flag: state.flag,
            ui: state.ui,
          },

          flag: {
            flagName: "",
            selectedColor: PRESET_COLORS[0],
            bgOpacity: 0.38,
            selectedFont: "Manrope",
            selectedIcon: null,
            category: {
              name: "",
              id: "",
            },
          },

          ui: {
            isCreatingNew: false,
            editingFlagId: null,
          },
        };
      }),
  };
});
