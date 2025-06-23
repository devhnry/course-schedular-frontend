import {create} from 'zustand';

interface HodDashboardState {
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
}

export const useHodDashboard = create<HodDashboardState>()(
    (set) => ({
        selectedIndex: 0,
        setSelectedIndex: (selectedIndex) => set({ selectedIndex })
    })
);