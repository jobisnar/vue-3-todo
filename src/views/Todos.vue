<template>
    <h1>Your todo list!</h1>
    <div class="todos">
        <div class="todo" v-for="(todo, index) in filteredTodos" :key="index">
            <input type="checkbox" v-model="todo.completed">
            <div class="todotext">{{todo.title}}</div>
        </div>
    </div>
    <div class="todoForm">
        
        <form @submit.prevent="onSubmit">
            <!-- :class="{'exceeded': bla}" adds the class when the expreession is true -->
            <label for="input" class="label" :class="{'exceeded' : titleField.length > 20}">Todo ({{titleField.length}})</label>
            <input id="input" v-model="titleField">
            <button class="btn btn-outline-success" type="submit" value="Submit">Submit</button>
        </form>
        <button class="btn btn-outline-dark" @click="deleteInput">Delete</button>
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
                email: 'test@icannhas.com'
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
    display: flex;
    flex-direction: row;
    align-items: center;

    border-width: 1px;
    border-radius: 10px;
    border-style: solid;
    border-color: white;
    background-color: #42b983;
    color: white;
    font-size: 20px;
    margin: 10px;
    padding: 10px;
    width: 30%;
    transition: ease-in-out 0.3s;
    
    .todotext {
        padding: 5px;
    }

    &:hover {
        transform: scale(1.1);
    }
}

.btn {
    margin: 0px;
    padding: 5px;

}

#input {
    border-width: 1px;
    border-style: solid;
    border-color: rgb(155, 155, 155);
    border-radius: 5px;
    padding: 5px;
    margin: 10px;
    width: 300px;
}

.label {
    font-family: Tahoma;
    color: rgb(58, 58, 58);
    font-size: 20px;
}

</style>
