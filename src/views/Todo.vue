<template>
    <DataInput @addElement="addElement" @onChange="onChange"></DataInput>
    <div class="todo-list" v-if="!isEmpty">
        <TodoList :filterName="filterName" :filterPriority="filterPriority"></TodoList>
    </div>
    <div v-else class="todo-list">
        Aún no tenemos datos guardados
    </div>
</template>
<script>
  import { computed, ref } from "vue";
  import { useMainStore } from "@/store";
  import DataInput from "@/components/DataInput.vue";
  import TodoList from "@/components/TodoList.vue";
  export default {
    components: {
      DataInput,
      TodoList
    },
    setup() {
      const main = useMainStore();
      const filterName = ref('');
      const filterPriority = ref('');
      const addElement = ({ value, priority = 'high' }) => {
        main.addTodo({ value, priority: priority || 'High' });
      };
      const onChange = ({ value, priority = 'high' }) => {
        filterName.value = value
        filterPriority.value = priority
      }
      return {
        addElement,
        onChange,
        filterName,
        filterPriority,
        isEmpty: computed(() => main.todoEmpty),
      };
    }
  };
</script>
<style scoped>
    .todo-list {
        margin-top: 1rem;
    }
</style>
