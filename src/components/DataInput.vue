<template>
    <form @submit.prevent="addElement" class="flex-row">
        <input title="Indique el nombre de la tarea" placeholder="Escriba el nombre de la tarea para filtrar o añadir" required type="text" v-model="value" />
        <select title="Prioridad de la tarea" v-model="priority">
            <option value="" selected>All</option>
            <option>High</option>
            <option>Mid</option>
            <option>Low</option>
        </select>
        <button title="Pulse para añadir una nueva tarea" type="submit">Añadir tarea</button>
    </form>
</template>

<script>
  import { ref, watchEffect } from "vue";
  export default {
    emits: ['addElement', 'onChange'],
    setup(props, { emit }) {
      const value = ref('');
      const priority = ref('');
      const addElement = () => {
        emit('addElement', { value: value.value, priority: priority.value })
        value.value = '';
      }
      watchEffect(() => {
        emit('onChange', { value: value.value, priority: priority.value })
      })
      return {
        value,
        priority,
        addElement
      };
    }
  };
</script>
<style scoped>
    .flex-row {
        display: flex;
        flex-wrap: wrap;
    }
    input {
        width: 100%;
        height: calc(3em + 8px);
        padding: 12px 20px;
        box-sizing: border-box;
        margin-bottom: 5px;
    }
    input:focus,
    input:focus-visible,
    select:focus,
    select:focus-visible{
        outline: none;
    }
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    select {
        appearance: none;
        background-color: transparent;
        padding: 12px 20px;
        width: 100%;
        height: 3em;
        font-family: inherit;
        font-size: inherit;
        cursor: inherit;
        line-height: inherit;
        margin-bottom: 5px;
    }
    button[type=submit] {
        padding: 12px 20px;
        width: 100%;
        height: 3em;
        background:#ccc;
        border:0 none;
        cursor:pointer;
        -webkit-border-radius: 5px;
        border-radius: 5px;
    }
</style>

