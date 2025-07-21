<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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

const tasks = ref([])
async function getTasks(page = 1, size = 10, status = null) {
  try {
    const res = await api.get(`/tasks?page=1&size=10`)
    tasks.value = res.data.tasks
  } catch (error) {
    console.log(error)
  }
}

async function getRunningTasksCount() {
  try {
    const result = await api.get(`/tasks?status=1`)
    if (result.code == 200) {
      return result.data.count
    }
  } catch (error) {
    console.error(error)
  }
  return 0
}

function statusLabel(value) {
  switch (value) {
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

function typeLabel(value) {
  switch (value) {
    case 0:
      return '导入账号'
    case 1:
      return '创建频道'
  }
}

function progressLabel(progress, total) {
  return Math.round((progress / total) * 100 * 100) / 100
}

const selectedType = ref(null)

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

const taskTitle = ref('')
const channelCount = ref(1)
const channelTitle = ref('Channel')
const botUsername = ref('')
const selectedLang = ref(null)

const sessions_dir = ref('')

async function createTask() {
  let args = []
  if (selectedType.value === 0) {
    args = [sessions_dir.value]
  } else if (selectedType.value === 1) {
    args = [channelCount.value, selectedLang.value, channelTitle.value, botUsername.value]
  }

  const willCheck = [taskTitle.value, ...args]

  if (!willCheck.every((value) => value)) {
    console.error('不合法的参数')
    ElMessage.error('不合法的参数')
    return
  }
  try {
    const data = {
      title: taskTitle.value,
      t_type: selectedType.value,
      args: args
    }
    const result = await api.post('/tasks', data)

    if (result.code === 201) {
      ElMessage.success(result.message)
      getTasks()
      dialogVisible.value = false
    } else {
      ElMessage.error(result.message)
    }
  } catch (error) {
    ElMessage.error('网络错误')
  }
}

async function startTask(taskId) {
  try {
    const result = await api.post(`/tasks/start/${taskId}`)
    if (result.code === 200) {
      ElMessage.success(result.message)
    } else {
      EleMessage.error(result.message)
    }
  } catch {
    EleMessage.error('网络错误')
  }
}

let interval = null
onMounted(() => {
  getTasks()
  interval = setInterval(async () => {
    await getTasks()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
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
        <!-- <el-table-column prop="status" label="状态">
          <template #default="scope"> </template>
        </el-table-column> -->
        <el-table-column label="状态">
          <template #default="scope">
            <el-progress
              v-if="scope.row.status === 1"
              :percentage="progressLabel(scope.row.progress, scope.row.total)"
            />
            <span v-else>
              {{ statusLabel(scope.row.status) }}
            </span>
            <!-- <el-progress :percentage="progressLabel(4, 7)" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="create_at" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="op" label="操作" fixed="right">
          <template #default="scope">
            <el-space>
              <el-button type="primary" size="small">详情</el-button>
              <el-button
                v-if="scope.row.status === 0"
                type="success"
                size="small"
                @click="startTask(scope.row.id)"
              >
                启动
              </el-button>
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
            <span>任务名称</span>
            <el-input v-model="taskTitle" />
          </el-space>
        </div>
        <div>
          <el-space>
            <span>频道数量</span>
            <el-input v-model="channelCount" type="number" />
          </el-space>
        </div>
        <div style="margin-top: 12px">
          <el-space>
            <span>频道名称</span>
            <el-input v-model="channelTitle" />
          </el-space>
        </div>
        <div style="margin-top: 12px">
          <el-space>
            <span>机器人名称</span>
            <el-input v-model="botUsername" placeholder="@botusername" />
          </el-space>
        </div>
        <div style="margin-top: 12px">
          <el-space>
            <span>频道语言</span>
            <el-select style="width: 180px" v-model="selectedLang" placeholder="选择语言">
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
        <el-button @click="dialogVisible = false"> 返回 </el-button>
        <el-button v-if="selectedType !== null" type="primary" @click="createTask()">
          创建任务
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
