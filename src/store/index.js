import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    todos: useStorage('todos', [])
  }),
  getters: {
    getAllTodos() {
      return this.todos
    },
    todoEmpty() {
      return this.todos.length <= 0
    }
  },
  actions: {
    addTodo(todo = { priority: 'HIGH'}) {
      if (!todo.value) {
        console.warn('Not found todo value')
        return
      }
      todo.priority = todo.priority.toLowerCase()
      this.todos.push(todo)
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    },
    reorderTodo(oldIndex, newIndex) {
      if (newIndex >= this.todos.length) {
        var k = newIndex - this.todos.length + 1
        while (k--) {
          this.todos.push(undefined)
        }
      }
      this.todos.splice(newIndex, 0, this.todos.splice(oldIndex, 1)[0])
    }
  }
})
