import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface AuthState {
    inviteToken: string | null;
    setInviteToken: (token: string | null) => void;

    inviteVerified: boolean | null;
    setInviteVerified: (inviteVerified: boolean | null) => void;
}

export const useInvitationStore = create<AuthState>()(
    persist(
        (set) => ({
            inviteToken: null,
            setInviteToken: (inviteToken) => set({ inviteToken }),

            inviteVerified: false,
            setInviteVerified: (inviteVerified) => set({ inviteVerified }),
        }),
        {
            name: 'invite-storage',
        }
    )
);