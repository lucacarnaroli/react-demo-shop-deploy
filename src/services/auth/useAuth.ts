import { create } from "zustand";
import * as AuthService from './auth.api'

export interface AuthState {
    token: string | null,
    isLogged: boolean,
    error: boolean,
    login: (username: string, password: string) => void,
    logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
    error: false,
    token: AuthService.getToken(),
    isLogged: AuthService.isLogged(),
    login: async (username, password) => {
        // appena riprovo ad accedere al login se appena andato in errore sarà false ma con questa riga di codice no sarà risettato a false
        set({ error: false, isLogged: false })
        try {
            await AuthService.login(username, password)
            set({ isLogged: AuthService.isLogged(), token: AuthService.getToken()})
        } catch (error) {
            set({ error: true, isLogged: false })
        }
        
    },
    logout: () => {
        AuthService.logout()
        set({ isLogged: false, token: null })
    },
}))