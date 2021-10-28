<template>
    <div v-for="(todo, index) in todos" :key="index" class="item" :class="todo.priority" title="Doble click para borrar" @dblclick="removeTodo(index)">
        <div class="mr-auto">{{ todo.value }}</div>
        <div>
            <i v-if="index !== 0" @click="modifyPositionElement(index, index - 1)" class="arrow up" title="Mover hacia arriba en la lista"></i>
        </div>
        <div>
            <i v-if="index + 1 !== totalTodos" @click="modifyPositionElement(index, index + 1)" class="arrow down" title="Mover hacia abajo en la lista"></i>
        </div>
    </div>
</template>
<script>
  import { computed } from "vue";
  import { useMainStore } from "@/store";
  export default {
    props: {
      'filterName': String,
      'filterPriority': String
    },
    setup(props) {
      const main = useMainStore();
      const addElement = ({ value, priority = 'high' }) => {
        main.addTodo({ value, priority: priority || 'High' });
      };
      const modifyPositionElement = (oldPosition, newPositon) => {
        if (newPositon !== undefined && oldPosition !== undefined) {
          main.reorderTodo(oldPosition, newPositon);
        }
      }
      return {
        modifyPositionElement,
        todos: computed(() => main.getAllTodos.filter(e => {
          const filterByValue = (!props.filterName || e.value.toUpperCase().indexOf(props.filterName.toUpperCase()) !== -1)
          const filterByPriority = (!props.filterPriority || e.priority === props.filterPriority.toUpperCase())
          return filterByValue && filterByPriority
        })),
        totalTodos: computed(() => main.getAllTodos.length),
        removeTodo: (index) => {
          if (confirm("Esta seguro que desea borrar la tarea?")) {
            main.removeTodo(index)
          }
        }
      };
    }
  };
</script>
<style scoped>
    .item {
        display: flex;
        border-radius: 6px;
        border: #efefef solid 1px;
        padding: 12px 20px;
        text-align: left;
        border-left: #2c3e50 solid 10px;
        margin-bottom: 10px;
        cursor: pointer;
    }
    .arrow {
        cursor: pointer;
        border: solid black;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
        margin-right: 10px;
    }

    .up {
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
    }

    .down {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }
    .mr-auto {
        margin-right: auto!important;
    }
    .high {
        border-color: green;
    }
    .mid {
        border-color: black;
    }
    .low {
        border-color: #efefef;
    }
</style>
