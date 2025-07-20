<script setup>
import { ref } from 'vue'
import routes from './router/routes'

const menuItems = ref(routes)
</script>

<template>
  <el-container>
    <el-aside>
      <el-menu router :default-active="$route.path">
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
          <template #title>{{ item.meta.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped>
.el-container {
  height: 100%;
}

.el-aside {
  max-width: 150px;
}
</style>
