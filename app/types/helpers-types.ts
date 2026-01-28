import { GitUser } from '@/app/domain/types/search-github.types';

export type IconLocation = 'left' | 'right'

export type CommonGap = '1' | '1.5' | '2' | '2.5' | '4' | '8' | '16';

export type ZustandSet = {
    (partial: unknown, replace?: false): void
    (state: unknown, replace: true): void
}

export type ZustandStoreOptions = {
    setLastUser: (user: GitUser| null) => void
    user: GitUser | null
}