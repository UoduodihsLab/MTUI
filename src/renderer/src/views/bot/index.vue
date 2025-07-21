<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../api/http'

const bots = ref([])
const getBots = async (page = 1, size = 10) => {
    try {
        const result = await api.get('/bots')
        if (result.code === 200) {
            bots.value = result.data.bots
        }
    } catch (error) {
        console.error(error)
    }
}

const creationDialogVisible = ref(false)
const botUsername = ref('')
const botToken = ref('')
const createBot = async () => {
    const args = [botUsername.value, botToken.value]
    if (!args.every((value) => value)) {
        ElMessage.error('参数不合法')
        return
    }

    const data = {
        username: botUsername.value,
        token: botToken.value
    }

    try {
        const result = await api.post('/bots', data)
        if (result.code === 201){
            ElMessage.success(result.message)
        } else {
            ElMessage.error(result.message)
        }
    } catch (error) {
        ElMessage.error(error)
    }
}

onMounted(() => {
    getBots()
})
</script>

<template>
    <div>
        <div>
            <el-button @click="creationDialogVisible = true" type="primary">添加机器人</el-button>
        </div>
        <div style="margin-top: 12px">
            <el-table :data="bots" border>
                <el-table-column prop="id" label="编号" width="100" />
                <el-table-column prop="username" label="username" show-overflow-tooltip />
                <el-table-column prop="token" label="token" show-overflow-tooltip width="500" />
                <el-table-column label="操作">
                    <el-space>
                        <el-button type="success" size="small">修改</el-button>
                    </el-space>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog v-model="creationDialogVisible" title="添加机器人" width="400">
            <div>
                <div class="arg">
                    <div class="arg-label">
                        <span>username</span>
                    </div>
                    <div class="arg-value">
                        <el-input v-model="botUsername" placeholder="@username" />
                    </div>
                </div>
                <div class="arg">
                    <div class="arg-label">
                        <span>token</span>
                    </div>
                    <div class="arg-value">
                        <el-input v-model="botToken" />
                    </div>
                </div>
            </div>
            <template #footer>
                <el-button @click="createBot()" type="primary">确认添加</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped>
.arg {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 12px;
}

.arg-label {
    flex: 2;
}

.arg-value {
    flex: 8;
}
</style>
