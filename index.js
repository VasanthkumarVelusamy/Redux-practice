function createStore() {
    // Store should have the following components
    // 1. the state.
    // 2. getting the state.
    // 3. listening to the changes of the state
    // 4. updating the state

    let state

    let getState = () => state

    return {
        getState
    }
}