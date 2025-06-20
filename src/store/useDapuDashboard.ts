import {create} from 'zustand';

interface DashboardState {
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
}

export const useDapuDashboard = create<DashboardState>()(
        (set) => ({
            selectedIndex: 0,
            setSelectedIndex: (selectedIndex) => set({ selectedIndex })
        })
);
