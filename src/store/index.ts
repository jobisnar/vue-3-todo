import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';


// define typings
export interface Todo {
    title: string;
    completed: boolean;
}

export interface Todos {
    todos: Todo[]
}

// define injection key
export const key: InjectionKey<Store<Todos>> = Symbol();

export const store = createStore<Todos>({
  state: {
    todos: [{title: 'Eat dinner at 7PM', completed: false}]
  },

  // Mutations are functions that affect the state.
  mutations: {
      ADD_TODO(state, todo) {
          state.todos.push(todo);
      }

  },

  // Actions are functions you use in your app that call mutations
  actions: {
      addTodo({ commit }, todo) {
          console.log('logging add todo from inside the store!');
          commit('ADD_TODO', todo);
      }

  },

  modules: {

  }

});

export function useStore() {
    return baseUseStore(key);
}
