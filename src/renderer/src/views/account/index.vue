<script setup>
import { ref } from 'vue'

const accounts = ref([])
</script>

<template>
  <div>
    <!-- <div>
      <el-space>
        <el-button type="primary">批量导入账号</el-button>
        <el-button type="success">清除失效账号</el-button>
      </el-space>
    </div> -->
    <div style="margin-top: 12px;">
      <el-table :data="accounts">
        <el-table-column prop="phone" label="名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="available" label="是否失效"></el-table-column>
        <el-table-column prop="flood_expire_at" label="限制时间"></el-table-column>
        <el-table-column prop="using" label="使用状态"></el-table-column>
        <el-table-column prop="operations" label="操作"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
