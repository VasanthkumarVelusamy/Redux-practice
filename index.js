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

function createStore() {
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

    return {
        getState
    }
}

const myStore = createStore()

const unsubscribe = myStore.subscribe(()=> { // adding this callback to the listeners array in the store. So it will be called when state change occurs.

})
// and this function will return the function, calling which removes the callback from the listeners array in the store.
unsubscribe()