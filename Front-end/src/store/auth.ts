import { sessionData } from './../interfaces/interfaces'
import { create } from 'zustand'
import axios from 'axios'

type StoreAuth = {
  isAuthenticated: boolean | undefined
  sessionData: sessionData | undefined
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
  session: () => Promise<void>
}

const useAuthStore = create<StoreAuth>((set) => ({
  isAuthenticated: undefined,
  sessionData: undefined,
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
    console.log(response.data)
    set({ isAuthenticated: response.data ? false : true })
  },
  session: async () => {
    try {
      const session = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
        {
          withCredentials: true,
        },
      )
      set({ sessionData: session.data })
    } catch (error) {
      return console.log(error)
    }
  },
}))

export default useAuthStore
