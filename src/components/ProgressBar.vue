<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from 'view-ui-plus'

const props = defineProps<{
    title: string
    progress: number // 0-100
    count: number
    total?: number
    color?: string
}>()

const progress = ref(props.progress)
const color = ref(props.color || '#13ce66')

// format count on the right, depends on the total count if available
function formatCount(){
    if (props.total) {
        return `${props.count} / ${props.total}`
    } else {
        return `${props.count}`
    }
}

// text-inside could not use with hide-info
</script>
<template>
    <div>
        <div class="progress-bar">
            <div class="title">{{ props.title }}</div>
            <div class="count">{{ formatCount() }}</div>
        </div>
        <Progress :percent="progress" 
                  :stroke-width="14" 
                  :stroke-color="color"
                  :hide-info="true" />
    </div>
   
</template>
<style scoped>
.progress-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0px;
}
.title {
    font-size: 16px;
    font-weight: bold;
}
.count {
    font-size: 14px;
    color: #669;
}
</style>