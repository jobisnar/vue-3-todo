<template>
    <h1>Your todo list!</h1>
    <h3>{{user.name}} | {{user.email}}</h3>
    <div class="todos">
        <div class="todo" v-for="(todo, index) in filteredTodos" :key="index">
            Name: {{todo.title}}, completed: {{todo.completed}}
        </div>
    </div>
    <div class="todoForm">
        
        Input: {{titleField}}
        
        <form @submit.prevent="onSubmit">
            <!-- :class="{'exceeded': bla}" adds the class when the expreession is true -->
            <label for="input" :class="{'exceeded' : titleField.length > 20}">Todo ({{titleField.length}})</label>
            <input id="input" v-model="titleField">
            <button type="submit" value="Submit">Submit</button>
        </form>
        <button @click="deleteInput">Delete</button>
    </div>
</template>

<script lang="ts">
    /* eslint-disable */
    import { defineComponent, ref, reactive, computed, watch } from "vue";
    import { useStore } from '../store';

    export default defineComponent({
        name: "Todos",
        components: {
        },
        setup(props, context){
            
            // using vuex store
            const store = useStore();

            //const todos = ref([{title: 'test todo', completed: false}, {title: 'Do this todo', completed: false}]);
            const todos = computed(() => store.state.todos);

            // similar to react's useState
            // still uses reactive
            const titleField = ref('');

            // creates objects instead of single variables
            // ref is still a reactive with just a 'value' inside

            const user = reactive({
                name: 'Jasper',
                email: 'jasper@icannhas.com'
            });

            const invalidInput = ref(false);

            // similar to useEffect, runs when the first prop changes value!
            watch(invalidInput, function(value, prevValue){
                alert('You entered an invalid input.')
                console.log('Invalid input!!');
                console.log('titleField changed! prev: ' + prevValue + ' current: ' + value);
            })

            function onSubmit(){
                if (titleField.value !== ''){
                    console.log('Submitting new todo!: ' + titleField.value);
                    
                    //change this to the one in store
                    //todos.value.push({title: titleField.value, completed: false});
                    store.dispatch('addTodo', {title: titleField.value, completed: false});

                    // try custom event emit
                    context.emit('add-todo', titleField.value);
                    deleteInput();
                } else {
                    invalidInput.value = !invalidInput.value;
                }
            }

            function deleteInput(){
                titleField.value = '';
            }

            // making a computed function that filters todos with 'Evil'
            const filteredTodos = computed(function() {
                return todos.value.filter(
                    (todo) => !todo.title.includes('Evil')
                );
            });
            
            //can also name it like 'todoList: todos'
            //need to return all data/methods/computed/watchers used in template
            return {
                todos,
                titleField,
                onSubmit,
                filteredTodos,
                deleteInput,
                user
            }
        }
    });
</script>

// Use scoped to make this style apply to this component only
// install scss to make nested css, easier to understand
<style lang="scss" scoped>
.exceeded {
    color: red;
}

.todos {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}

.todo {
    border-width: 1px;
    border-radius: 10px;
    border-style: solid;
    border-color: white;
    background-color: #42b983;
    color: white;
    font-size: 20px;
    margin: 10px;
    padding: 20px;
    width: 60%;
    transition: ease-in-out 0.3s;

    &:hover {
        transform: scale(1.1);
    }
}

</style>
