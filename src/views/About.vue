<template>
  <div class="about">
    <h1>This is the ABOUT PAGE!</h1>
    <p v-for="(todo, index) in todos" :key="index">{{todo.title}}: {{todo.completed}}</p>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from '../store'

export default defineComponent({
    name: 'About',
    setup(props, context) {
        const store = useStore();

        const todos = computed(() => store.state.todos);

        return {
            todos
        }
    }
});
</script>
