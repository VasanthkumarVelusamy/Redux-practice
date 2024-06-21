{
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  }
}

{
  type: 'REMOVE_TODO',
  id: 0,
}

{
  type: 'TOGGLE_TODO',
  id: 0,
}

{
  type: 'ADD_GOAL',
  goal: {
    id: 0,
    name: 'Run a Marathon'
  }
}

{
  type: 'REMOVE_GOAL',
  id: 0,
}

const todos = (state = [], action) => {
    if (action.type = 'ADD_TODO') {
        return [...state, action.todo]
    }

    return state
}

function createStore(reducer) {
    // Store should have the following components
    // 1. the state.
    // 2. getting the state.
    // 3. listening to the changes of the state
    // 4. updating the state

    let state
    let listeners = []

    let getState = () => state

    let subscribe = (listener) => {
        listeners.push(listener)

        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    let dispatch = (action) => {
        // 1. call reducer function to update the state
        state = reducer(state, action)
        // 2. loop over the listeners and invoke them
        listeners.forEach(listener => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

const myStore = createStore(todos)

const unsubscribe = myStore.subscribe(()=> { // adding this callback to the listeners array in the store. So it will be called when state change occurs.
    console.log('this is the new state', myStore.getState())
})
// and this function will return the function, calling which removes the callback from the listeners array in the store.
// unsubscribe()

myStore.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  }
})