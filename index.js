// Library code
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

// App code

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// Action creators
const addTodoAction = (todo) => {
    return {
        type: ADD_TODO,
        todo
    }
}

const removeTodoAction = (id) => {
    return {
        type: REMOVE_TODO,
        id
    }
}

const toggleTodoAction = (id) => {
    return {
        type: TOGGLE_TODO,
        id
    }
}

const addGoalAction = (goal) => {
    return {
        type: ADD_GOAL,
        goal
    }
}

const removeGoalAction = (id) => {
    return {
        type: REMOVE_GOAL,
        id
    }
}

const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.todo]
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map((todo) => todo.id !== action.id ? todo : {...todo, complete: !todo.complete})
        default:
            return state
    }
}

const goals = (state = [], action) => {
    switch (action.type) {
        case ADD_GOAL:
            return [...state, action.goal]
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id)
        default:
            return state
    }
}

const app = (state = {}, action) => {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}



const myStore = createStore(app)

const unsubscribe = myStore.subscribe(()=> { // adding this callback to the listeners array in the store. So it will be called when state change occurs.
    console.log('this is the new state', myStore.getState())
})
// and this function will return the function, calling which removes the callback from the listeners array in the store.
// unsubscribe()

myStore.dispatch(addTodoAction({
    id: 0,
    name: 'Learn Redux',
    complete: false,
}))

myStore.dispatch(addTodoAction({
    id: 1,
    name: 'Learn React',
    complete: false,
}))

myStore.dispatch(addTodoAction({
    id: 2,
    name: 'Learn React Native',
    complete: false,
}))

myStore.dispatch(removeTodoAction(2))

myStore.dispatch(toggleTodoAction(1))

myStore.dispatch(addGoalAction({
    id: 0,
    name: 'Run a Marathon'
}))

myStore.dispatch(removeGoalAction(0))