import { zhCN, dateZhCN, darkTheme, lightTheme } from 'naive-ui'
import type { GlobalThemeOverrides, ConfigProviderProps } from 'naive-ui'

/** 主题配置 */
export const themeSettings = reactive({
  /** 主题类型 */
  type: 'dark' as 'dark' | 'light'
})

/** 深色主题覆盖 */
const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    bodyColor: 'rgba(0, 0, 0, 0.1)',
    cardColor: 'rgba(0, 0, 0, 0.4)',
    dividerColor: 'rgba(0, 0, 0, 0)',
    /* primaryColor: 'rgb(173, 63, 224)',
      primaryColorHover: 'rgb(175, 122, 199)',
      primaryColorPressed: 'rgb(186, 92, 230)',
      primaryColorSuppl: 'rgb(144, 43, 190)', */
    popoverColor: 'rgba(16, 16, 16, 0.8)',
    modalColor: 'rgba(0, 0, 0, 0.6)'
  }
}

/** 浅色主题覆盖 */
const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    bodyColor: 'rgba(255, 255, 255, 0.1)',
    cardColor: 'rgba(255, 255, 255, 0.4)',
    actionColor: 'rgba(255, 255, 255, 0.4)',
    dividerColor: 'rgba(255, 255, 255, 0.1)',
    /* primaryColor: 'rgb(173, 63, 224)',
      primaryColorHover: 'rgb(175, 122, 199)',
      primaryColorPressed: 'rgb(186, 92, 230)',
      primaryColorSuppl: 'rgb(144, 43, 190)', */
    popoverColor: 'rgba(255, 255, 255, 0.8)',
    modalColor: 'rgba(255, 255, 255, 0.6)',
    tableHeaderColor: 'rgba(255, 255, 255, 0.1)'
  }
}

/**
 * Native UI 配置
 * @url https://www.naiveui.com/zh-CN/light/docs/customize-theme
 */
export const nativeProvider: ConfigProviderProps = reactive({
  locale: readonly(zhCN),

  dateLocale: readonly(dateZhCN),

  theme: computed(() => (themeSettings.type === 'dark' ? darkTheme : lightTheme)),

  themeOverrides: computed(() =>
    themeSettings.type === 'dark' ? darkThemeOverrides : lightThemeOverrides
  )
})
