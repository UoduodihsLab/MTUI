<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../api/http'

const dialogVisible = ref(false)
const taskTypes = ref([
  {
    label: '导入账号',
    value: 0
  },
  {
    label: '创建频道',
    value: 1
  }
])

const channelCount = ref(5)
const selectedType = ref(0)

const languages = ref([
  {
    label: '英文',
    value: 'en'
  },
  {
    label: '中文',
    value: 'zh-cn'
  },
  {
    label: '德语',
    value: 'de'
  },
  {
    label: '阿拉伯语',
    value: 'ar'
  },
  {
    label: '越南语',
    value: 'vi'
  }
])

const selectedLang = ref('en')

const tasks = ref([])

async function getTasks(page = 1, size = 10, status = null) {
  try {
    const res = await api.get(`/tasks?page=1&size=10`)
    tasks.value = res.data.tasks
  } catch (error) {
    console.log(error)
  }
}

function typeLabel(value){
  switch(value){
    case 0:
      return '导入账号'
    case 1:
      return '频道创建'
  }
}

function statusLabel(value){
  switch(value){
    case 0:
      return '待执行'
    case 1:
      return '执行中'
    case 2:
      return '已完成'
    case 3:
      return '失败'
  }
}

onMounted(() => {
  getTasks()
})
</script>

<template>
  <div>
    <div>
      <el-space>
        <el-button type="primary" @click="dialogVisible = true">创建任务</el-button>
      </el-space>
    </div>
    <div style="margin-top: 12px">
      <el-table :data="tasks" border>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="title" label="名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="t_type" label="类型">
          <template #default="scope">
            <span>{{ typeLabel(scope.row.t_type) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="args" label="参数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <span>{{ statusLabel(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="progress" label="进度"></el-table-column>
        <el-table-column prop="create_at" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="op" label="操作" fixed="right">
          <template #default="scope">
            <el-space>
              <el-button type="primary" size="small">详情</el-button>
              <el-button type="success" size="small">启动</el-button>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogVisible" title="创建任务" width="500">
      <el-select v-model="selectedType" placeholder="选择任务类型">
        <el-option
          v-for="item in taskTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div v-if="selectedType == 0" style="margin-top: 12px">
        <el-space>
          <el-input placeholder="选择账号目录" :disabled="true" />
        </el-space>
      </div>
      <div v-if="selectedType == 1" style="margin-top: 12px">
        <div>
          <el-space>
            <span>输入频道数量: </span>
            <el-input v-model="channelCount" type="number" placeholder="输入需要创建的频道数量" />
          </el-space>
        </div>
        <div style="margin-top: 12px">
          <el-space>
            <span>选择频道语言: </span>
            <el-select v-model="selectedLang" placeholder="选择语言">
              <el-option
                v-for="item in languages"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-space>
        </div>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">返回</el-button>
        <el-button type="primary">创建任务</el-button>
      </template>
    </el-dialog>
  </div>
</template>
