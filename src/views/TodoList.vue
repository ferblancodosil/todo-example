<template>
    <DataInput @addElement="addElement" @onChange="onChange"></DataInput>
    <div v-if="!isEmpty">
        <p v-for="(todo, index) in todos" :key="index">
            {{ todo }}
            <button @click="removeTodo(index)">delete</button>
            <button v-if="index !== 0" @click="modifyPositionElement(index, index - 1)">Move up</button>
            <button v-if="index + 1 !== totalTodos" @click="modifyPositionElement(index, index + 1)">Move down</button>
        </p>
    </div>
    <div v-else>No todos found</div>
</template>
<script>
  import { computed, ref } from "vue";
  import { useMainStore } from "@/store";
  import DataInput from "@/components/DataInput.vue";
  export default {
    components: {
      DataInput
    },
    setup() {
      const main = useMainStore();
      const filterName = ref('');
      const filterPriority = ref('');
      const addElement = ({ value, priority = 'high' }) => {
        main.addTodo({ value, priority: priority || 'High' });
      };
      const modifyPositionElement = (oldPosition, newPositon) => {
        if (newPositon !== undefined && oldPosition !== undefined) {
          main.reorderTodo(oldPosition, newPositon);
        }
      }
      const onChange = ({ value, priority = 'high' }) => {
        filterName.value = value
        filterPriority.value = priority
      }
      return {
        addElement,
        modifyPositionElement,
        onChange,
        todos: computed(() => main.getAllTodos.filter(e => {
          const filterByValue = (!filterName.value || e.value.toUpperCase().indexOf(filterName.value.toUpperCase()) !== -1)
          const filterByPriority = (!filterPriority.value || e.priority === filterPriority.value.toUpperCase())
          return filterByValue && filterByPriority
        })),
        totalTodos: computed(() => main.getAllTodos.length),
        isEmpty: computed(() => main.todoEmpty),
        removeTodo: main.removeTodo,
      };
    }
  };
</script>
