<template>
  <n-layout-sider
    class="app-side"
    bordered
    show-trigger
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :native-scrollbar="false"
  >
    <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
  </n-layout-sider>
</template>

<script setup lang="tsx" name="AppSide">
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { HomeOutline as HomeIcon } from '@vicons/ionicons5'

import { renderIcon } from '@/utils'

/** 生成菜单文案 */
function renderLabel(item: (typeof menuItems)[0]) {
  return () => <RouterLink to={item.to}>{item.label}</RouterLink>
}

/** 菜单配置 */
const menuItems = [
  {
    label: '首页',
    to: { name: 'Home' },
    icon: HomeIcon
  }
]

/** 菜单选项 */
const menuOptions: MenuOption[] = menuItems.map((item) => ({
  key: item.to?.name || item.label,
  label: renderLabel(item),
  icon: renderIcon(item.icon)
}))
</script>

<style lang="scss" scoped>
.app-side {
  width: 260px;
  backdrop-filter: blur(2px);
}
</style>
