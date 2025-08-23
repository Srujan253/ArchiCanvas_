import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('archicanvas-theme')
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.setAttribute('data-theme', 'archicanvas-dark')
      localStorage.setItem('archicanvas-theme', 'dark')
    } else {
      root.setAttribute('data-theme', 'archicanvas')
      localStorage.setItem('archicanvas-theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const value = {
    isDark,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
