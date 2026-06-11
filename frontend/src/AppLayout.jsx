import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'

const materialYou = {
  blue: {
    light: {
      '--md-sys-color-primary': '#005ac1',
      '--md-sys-color-on-primary': '#ffffff',
      '--md-sys-color-secondary': '#4c5d92',
      '--md-sys-color-secondary-container': '#dce1ff',
      '--md-sys-color-surface': '#f8f9ff',
      '--md-sys-color-surface-container': '#e6ecff',
      '--md-sys-color-on-surface': '#161c2b',
      '--md-sys-color-on-surface-variant': '#43495d',
      '--md-sys-color-outline': '#596075',
      '--md-sys-color-outline-variant': '#bcc3dc',
      '--md-state-layers-primary-opacity-16': '0.16'
    },
    dark: {
      '--md-sys-color-primary': '#adc6ff',
      '--md-sys-color-on-primary': '#002e68',
      '--md-sys-color-secondary': '#bdc5f0',
      '--md-sys-color-secondary-container': '#344479',
      '--md-sys-color-surface': '#0f1626',
      '--md-sys-color-surface-container': '#23304b',
      '--md-sys-color-on-surface': '#dde3f9',
      '--md-sys-color-on-surface-variant': '#c1c7df',
      '--md-sys-color-outline': '#8b92a9',
      '--md-sys-color-outline-variant': '#43495d',
      '--md-state-layers-primary-opacity-16': '0.16'
    }
  },
  purple: {
    light: {
      '--md-sys-color-primary': '#6f43c0',
      '--md-sys-color-on-primary': '#ffffff',
      '--md-sys-color-secondary': '#66587d',
      '--md-sys-color-secondary-container': '#eadcff',
      '--md-sys-color-surface': '#fdf7ff',
      '--md-sys-color-surface-container': '#efe4fb',
      '--md-sys-color-surface-container-high': '#e4d8ef',
      '--md-sys-color-on-surface': '#21182b',
      '--md-sys-color-on-surface-variant': '#4c4257',
      '--md-sys-color-outline': '#7d7188',
      '--md-sys-color-outline-variant': '#cdc0d9',
      '--md-sys-color-shadow': 'rgb(0 0 0)',
      '--md-state-layers-primary-opacity-16': '0.16'
    },
    dark: {
      '--md-sys-color-primary': '#d7baff',
      '--md-sys-color-on-primary': '#3e0f7d',
      '--md-sys-color-secondary': '#d2c1e9',
      '--md-sys-color-secondary-container': '#4e4164',
      '--md-sys-color-surface': '#17111f',
      '--md-sys-color-surface-container': '#2a2136',
      '--md-sys-color-surface-container-high': '#352b42',
      '--md-sys-color-on-surface': '#eee5f7',
      '--md-sys-color-on-surface-variant': '#d0c4da',
      '--md-sys-color-outline': '#998ca4',
      '--md-sys-color-outline-variant': '#4c4257',
      '--md-sys-color-shadow': 'rgb(0 0 0)',
      '--md-state-layers-primary-opacity-16': '0.16'
    }
  },
  orange: {
    light: {
      '--md-sys-color-primary': '#8f4f00',
      '--md-sys-color-on-primary': '#ffffff',
      '--md-sys-color-secondary': '#765a37',
      '--md-sys-color-secondary-container': '#ffddb3',
      '--md-sys-color-surface': '#fff8f2',
      '--md-sys-color-surface-container': '#f5e6d4',
      '--md-sys-color-surface-container-high': '#eadac8',
      '--md-sys-color-on-surface': '#261a0f',
      '--md-sys-color-on-surface-variant': '#554536',
      '--md-sys-color-outline': '#857462',
      '--md-sys-color-outline-variant': '#d8c3ad',
      '--md-sys-color-shadow': 'rgb(0 0 0)',
      '--md-state-layers-primary-opacity-16': '0.16'
    },
    dark: {
      '--md-sys-color-primary': '#ffb95f',
      '--md-sys-color-on-primary': '#4c2700',
      '--md-sys-color-secondary': '#e5c190',
      '--md-sys-color-secondary-container': '#5b421f',
      '--md-sys-color-surface': '#1d1309',
      '--md-sys-color-surface-container': '#322413',
      '--md-sys-color-surface-container-high': '#3f2e1b',
      '--md-sys-color-on-surface': '#f7eadc',
      '--md-sys-color-on-surface-variant': '#dbc8b6',
      '--md-sys-color-outline': '#a18d79',
      '--md-sys-color-outline-variant': '#554536',
      '--md-sys-color-shadow': 'rgb(0 0 0)',
      '--md-state-layers-primary-opacity-16': '0.16'
    }
  },
  green: {
    light: {
      '--md-sys-color-primary': 'rgb(51 105 64)',
      '--md-sys-color-surface-tint': 'rgb(51 105 64)',
      '--md-sys-color-on-primary': 'rgb(255 255 255)',
      '--md-sys-color-primary-container': 'rgb(181 241 188)',
      '--md-sys-color-on-primary-container': 'rgb(26 81 42)',
      '--md-sys-color-secondary': 'rgb(80 99 81)',
      '--md-sys-color-on-secondary': 'rgb(255 255 255)',
      '--md-sys-color-secondary-container': 'rgb(211 232 210)',
      '--md-sys-color-on-secondary-container': 'rgb(57 75 59)',
      '--md-sys-color-tertiary': 'rgb(57 101 109)',
      '--md-sys-color-on-tertiary': 'rgb(255 255 255)',
      '--md-sys-color-tertiary-container': 'rgb(189 234 244)',
      '--md-sys-color-on-tertiary-container': 'rgb(32 77 85)',
      '--md-sys-color-error': 'rgb(186 26 26)',
      '--md-sys-color-on-error': 'rgb(255 255 255)',
      '--md-sys-color-error-container': 'rgb(255 218 214)',
      '--md-sys-color-on-error-container': 'rgb(147 0 10)',
      '--md-sys-color-background': 'rgb(246 251 242)',
      '--md-sys-color-on-background': 'rgb(24 29 24)',
      '--md-sys-color-surface': 'rgb(246 251 242)',
      '--md-sys-color-on-surface': 'rgb(24 29 24)',
      '--md-sys-color-surface-variant': 'rgb(221 229 218)',
      '--md-sys-color-on-surface-variant': 'rgb(65 73 65)',
      '--md-sys-color-outline': 'rgb(114 121 112)',
      '--md-sys-color-outline-variant': 'rgb(193 201 190)',
      '--md-sys-color-shadow': 'rgb(0 0 0)',
      '--md-sys-color-scrim': 'rgb(0 0 0)',
      '--md-sys-color-inverse-surface': 'rgb(45 50 44)',
      '--md-sys-color-inverse-on-surface': 'rgb(238 242 234)',
      '--md-sys-color-inverse-primary': 'rgb(154 212 161)',
      '--md-sys-color-primary-fixed': 'rgb(181 241 188)',
      '--md-sys-color-on-primary-fixed': 'rgb(0 33 10)',
      '--md-sys-color-primary-fixed-dim': 'rgb(154 212 161)',
      '--md-sys-color-on-primary-fixed-variant': 'rgb(26 81 42)',
      '--md-sys-color-secondary-fixed': 'rgb(211 232 210)',
      '--md-sys-color-on-secondary-fixed': 'rgb(14 31 17)',
      '--md-sys-color-secondary-fixed-dim': 'rgb(183 204 182)',
      '--md-sys-color-on-secondary-fixed-variant': 'rgb(57 75 59)',
      '--md-sys-color-tertiary-fixed': 'rgb(189 234 244)',
      '--md-sys-color-on-tertiary-fixed': 'rgb(0 31 37)',
      '--md-sys-color-tertiary-fixed-dim': 'rgb(161 206 216)',
      '--md-sys-color-on-tertiary-fixed-variant': 'rgb(32 77 85)',
      '--md-sys-color-surface-dim': 'rgb(215 219 211)',
      '--md-sys-color-surface-bright': 'rgb(246 251 242)',
      '--md-sys-color-surface-container-lowest': 'rgb(255 255 255)',
      '--md-sys-color-surface-container-low': 'rgb(241 245 237)',
      '--md-sys-color-surface-container': 'rgb(235 239 231)',
      '--md-sys-color-surface-container-high': 'rgb(229 234 225)',
      '--md-sys-color-surface-container-highest': 'rgb(223 228 220)',
      '--md-state-layers-primary-opacity-16': '0.16'
    },
    dark: {
      '--md-sys-color-primary': 'rgb(154 212 161)',
      '--md-sys-color-surface-tint': 'rgb(154 212 161)',
      '--md-sys-color-on-primary': 'rgb(0 57 23)',
      '--md-sys-color-primary-container': 'rgb(26 81 42)',
      '--md-sys-color-on-primary-container': 'rgb(181 241 188)',
      '--md-sys-color-secondary': 'rgb(183 204 182)',
      '--md-sys-color-on-secondary': 'rgb(35 52 37)',
      '--md-sys-color-secondary-container': 'rgb(57 75 59)',
      '--md-sys-color-on-secondary-container': 'rgb(211 232 210)',
      '--md-sys-color-tertiary': 'rgb(161 206 216)',
      '--md-sys-color-on-tertiary': 'rgb(0 54 62)',
      '--md-sys-color-tertiary-container': 'rgb(32 77 85)',
      '--md-sys-color-on-tertiary-container': 'rgb(189 234 244)',
      '--md-sys-color-error': 'rgb(255 180 171)',
      '--md-sys-color-on-error': 'rgb(105 0 5)',
      '--md-sys-color-error-container': 'rgb(147 0 10)',
      '--md-sys-color-on-error-container': 'rgb(255 218 214)',
      '--md-sys-color-background': 'rgb(16 21 16)',
      '--md-sys-color-on-background': 'rgb(223 228 220)',
      '--md-sys-color-surface': 'rgb(16 21 16)',
      '--md-sys-color-on-surface': 'rgb(223 228 220)',
      '--md-sys-color-surface-variant': 'rgb(65 73 65)',
      '--md-sys-color-on-surface-variant': 'rgb(193 201 190)',
      '--md-sys-color-outline': 'rgb(139 147 137)',
      '--md-sys-color-outline-variant': 'rgb(65 73 65)',
      '--md-sys-color-shadow': 'rgb(0 0 0)',
      '--md-sys-color-scrim': 'rgb(0 0 0)',
      '--md-sys-color-inverse-surface': 'rgb(223 228 220)',
      '--md-sys-color-inverse-on-surface': 'rgb(45 50 44)',
      '--md-sys-color-inverse-primary': 'rgb(51 105 64)',
      '--md-sys-color-primary-fixed': 'rgb(181 241 188)',
      '--md-sys-color-on-primary-fixed': 'rgb(0 33 10)',
      '--md-sys-color-primary-fixed-dim': 'rgb(154 212 161)',
      '--md-sys-color-on-primary-fixed-variant': 'rgb(26 81 42)',
      '--md-sys-color-secondary-fixed': 'rgb(211 232 210)',
      '--md-sys-color-on-secondary-fixed': 'rgb(14 31 17)',
      '--md-sys-color-secondary-fixed-dim': 'rgb(183 204 182)',
      '--md-sys-color-on-secondary-fixed-variant': 'rgb(57 75 59)',
      '--md-sys-color-tertiary-fixed': 'rgb(189 234 244)',
      '--md-sys-color-on-tertiary-fixed': 'rgb(0 31 37)',
      '--md-sys-color-tertiary-fixed-dim': 'rgb(161 206 216)',
      '--md-sys-color-on-tertiary-fixed-variant': 'rgb(32 77 85)',
      '--md-sys-color-surface-dim': 'rgb(16 21 16)',
      '--md-sys-color-surface-bright': 'rgb(54 58 53)',
      '--md-sys-color-surface-container-lowest': 'rgb(11 15 11)',
      '--md-sys-color-surface-container-low': 'rgb(24 29 24)',
      '--md-sys-color-surface-container': 'rgb(28 33 28)',
      '--md-sys-color-surface-container-high': 'rgb(38 43 38)',
      '--md-sys-color-surface-container-highest': 'rgb(49 54 49)',
      '--md-state-layers-primary-opacity-16': '0.16'
    }
  }
}

function AppLayout() {
  const themeRef = useRef({ colorScheme: 'green', mode: 'dark' })

  useEffect(() => {
    const root = document.documentElement
    const getResolvedMode = (mode) => {
      if (mode !== 'system') return mode

      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const applyTheme = (nextColorScheme, nextMode) => {
      const colorScheme = materialYou[nextColorScheme] ? nextColorScheme : themeRef.current.colorScheme
      const mode = materialYou[colorScheme][nextMode] ? nextMode : themeRef.current.mode

      themeRef.current = { colorScheme, mode }

      const tokens = materialYou[colorScheme][mode]
      Object.entries(tokens).forEach(([key, value]) => {
        root.style.setProperty(key, value)
      })

      root.dataset.colorScheme = colorScheme
      root.dataset.themeMode = mode
    }

    const applySavedTheme = () => {
      const savedColorScheme = localStorage.getItem('assinavideo.theme.color') || 'green'
      const savedMode = localStorage.getItem('assinavideo.theme.mode') || 'dark'
      applyTheme(savedColorScheme, getResolvedMode(savedMode))
    }

    const handleThemeClick = (event) => {
      const trigger = event.target.closest('[data-set-theme]')
      if (!trigger) return

      const color = trigger.getAttribute('data-color') || themeRef.current.colorScheme
      const mode = trigger.getAttribute('data-mode') || themeRef.current.mode
      applyTheme(color, mode)
    }

    window.setMaterialTheme = applyTheme
    applySavedTheme()

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', applySavedTheme)
    document.addEventListener('click', handleThemeClick)

    return () => {
      media.removeEventListener('change', applySavedTheme)
      document.removeEventListener('click', handleThemeClick)
      delete window.setMaterialTheme
    }
  }, [])

  return <Outlet />
}

export default AppLayout
