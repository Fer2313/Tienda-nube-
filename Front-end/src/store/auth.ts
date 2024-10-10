import { create } from 'zustand'
import axios from 'axios'

type StoreAuth = {
  isAuthenticated: boolean | undefined
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
}

const useAuthStore = create<StoreAuth>((set) => ({
  isAuthenticated: undefined,
  checkAuth: async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + '/api/auth/verify-session',
        {
          withCredentials: true,
        },
      )
      set({ isAuthenticated: response.data ? true : false })
    } catch (error) {
      if (error) {
        set({ isAuthenticated: false })
      }
    }
  },
  logout: async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + '/api/auth/logout',
      {
        withCredentials: true,
      },
    )
    set({ isAuthenticated: response.data ? false : true })
  },
}))

export default useAuthStore
