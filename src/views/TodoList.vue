<template>
    <form @submit.prevent="addElement(todoInput, todoPriority)">
        <input type="text" v-model="todoInput" />
        <select v-model="todoPriority">
            <option value="" selected>All</option>
            <option>Low</option>
            <option>Mid</option>
            <option>High</option>
        </select>
        <button type="submit">Add Todo</button>
    </form>
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
  export default {
    setup() {
      const main = useMainStore();
      const todoInput = ref('');
      const todoPriority = ref('');
      const addElement = (input, priority = 'high') => {
        if (input) {
          main.addTodo({ value: todoInput.value, priority: priority || 'High' });
          todoInput.value = "";
        }
      };
      const modifyPositionElement = (oldPosition, newPositon) => {
        if (newPositon !== undefined && oldPosition !== undefined) {
          main.reorderTodo(oldPosition, newPositon);
        }
      }
      return {
        addElement,
        modifyPositionElement,
        todoInput,
        todoPriority,
        todos: computed(() => main.getAllTodos.filter(e => !todoPriority.value || e.priority === todoPriority.value.toUpperCase())),
        totalTodos: computed(() => main.getAllTodos.length),
        isEmpty: computed(() => main.todoEmpty),
        removeTodo: main.removeTodo,
      };
    }
  };
</script>
