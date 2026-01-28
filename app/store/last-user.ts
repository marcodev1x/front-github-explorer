import { ZustandSet, ZustandStoreOptions } from '@/app/types/helpers-types';
import { GitUser } from '@/app/domain/types/search-github.types';
import { StateCreator } from 'zustand';

export const lastUserResource: StateCreator<ZustandStoreOptions> = (set) => ({
    user: null,
    setLastUser: (user: GitUser | null) => set({ user }),
});