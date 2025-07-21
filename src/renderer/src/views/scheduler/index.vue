<script setup>
import {ref, onMounted} from 'vue'

const schedulers = ref([])
</script>

<template>
    <div>
        <div>
            <el-button type="primary">新增批量消息任务</el-button>
        </div>

        <div style="margin-top: 12px;">
            <el-table :data="schedulers" border>
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="prompt" label="提示词"></el-table-column>
                <el-table-column prop="daily_count" label="每日发送数量"></el-table-column>
                <el-table-column prop="created_at" label="创建时间"></el-table-column>
                <el-table-column label="操作">
                    <el-space>
                        <el-button>停止</el-button>
                    </el-space>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>