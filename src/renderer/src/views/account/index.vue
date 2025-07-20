<script setup>
import { ref, onMounted } from 'vue'
import {api} from '../../api/http'
const accounts = ref([])

async function getAccounts(page=1, size=10){
  try{
    const res = await api.get('/accounts')
    console.log(res)
    accounts.value = res.data.accounts
  }catch(error){
    console.error(error)
  }
}



onMounted(()=>{
  getAccounts()
})
</script>

<template>
  <div>
    <div style="margin-top: 12px;">
      <el-table :data="accounts" border>
        <el-table-column prop="id" label="编号" width="100"></el-table-column>
        <el-table-column prop="phone" label="名称"></el-table-column>
        <el-table-column prop="path" label="路径" show-overflow-tooltip></el-table-column>
        <el-table-column prop="is_banned" label="是否失效"></el-table-column>
        <el-table-column prop="in_use" label="使用状态"></el-table-column>
        <el-table-column prop="limit_until" label="限制解除时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="last_used_at" label="上次使用" show-overflow-tooltip></el-table-column>
        <el-table-column prop="channels_count" label="频道数量"></el-table-column>
        <el-table-column prop="operations" label="操作">
          <template #default="scope">
            <el-space>
              <el-button size="small" type="danger">删除</el-button>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
