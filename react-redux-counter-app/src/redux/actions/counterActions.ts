enum CounterActionTypes {
    INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT',
    RESET = 'RESET'
}

const increment = () => ({
    type: CounterActionTypes.INCREMENT
});

const decrement = () => ({
    type: CounterActionTypes.DECREMENT
});

const reset = () => ({
    type: CounterActionTypes.RESET
});

export { CounterActionTypes, increment, decrement, reset };