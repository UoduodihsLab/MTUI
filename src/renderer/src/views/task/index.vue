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

async function get_tasks(page = 1, size = 10, status = null) {
  try {
    const res = await api.get(`/tasks?page=1&size=10`)
    tasks.value = res.data.tasks
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  get_tasks()
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
      <el-table :data="tasks">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="title" label="名称"></el-table-column>
        <el-table-column prop="t_type" label="类型"></el-table-column>
        <el-table-column prop="args" label="参数"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="progress" label="进度"></el-table-column>
        <el-table-column prop="create_at" label="创建时间"></el-table-column>
        <el-table-column prop="op" label="操作"></el-table-column>
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
        <div style="margin-top: 12px;">
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
