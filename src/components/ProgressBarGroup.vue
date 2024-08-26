<script setup lang="ts">
import { Card } from 'view-ui-plus' 
import { ProgressBarItem } from '@/types/InterfaceType' 
import ProgressBar  from '@/components/ProgressBar.vue'

const props = defineProps<{
    title: string // title of the group
    items: ProgressBarItem[] // items in the group
}>()


</script>
<template>
    <Card>
         <template #title>
            <Icon type="ios-film-outline"></Icon>
            <div class="group-title">{{ props.title }}</div>
        </template>
       
      
            <ProgressBar v-for="item in props.items" 
                         :title="item.title" 
                         :progress="item.progress" 
                         :count="item.count" 
                         :total="item.total"
                         :color="item.color" />
           
        
    </Card>

</template>
<style scoped>
.group-title {
   text-align: left;
   font-weight: bold;
}



</style>