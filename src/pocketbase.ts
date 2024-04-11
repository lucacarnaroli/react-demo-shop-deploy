import PocketBase from 'pocketbase'

export const pb = new PocketBase(import.meta.env.VITE_POCKET_PRODUCTION_URL);