import { NIcon } from 'naive-ui'
import type { Component } from 'vue'

/** 生成图标 */
export function renderIcon(icon?: Component) {
  if (!icon) return

  return () => (
    <NIcon>
      <icon />
    </NIcon>
  )
}

/** 生成下拉菜单 */
export function getDropdownOptions(
  options: {
    label: string
    theme?: 'primary' | 'success' | 'warning' | 'error'
    optionClass?: string
    icon?: Component
    disabled?: boolean
    onClick?: () => void
  }[]
) {
  return options.map(({ label, theme, optionClass, icon, disabled, onClick }) => ({
    label,
    icon: renderIcon(icon),
    disabled,
    props: { onClick, class: [theme && `text-${theme}`, optionClass].filter(Boolean).join(' ') }
  }))
}
