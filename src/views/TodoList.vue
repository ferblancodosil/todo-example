<template>
    <form @submit.prevent="addElement">
        <input type="text" v-model="todoInput" />
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
      const addElement = (priority = 'high') => {
        if (todoInput.value != "") {
          main.addTodo({ ...todoInput, priority });
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
        todos: computed(() => main.getAllTodos),
        totalTodos: computed(() => main.getAllTodos.length),
        isEmpty: computed(() => main.todoEmpty),
        removeTodo: main.removeTodo,
      };
    }
  };
</script>
