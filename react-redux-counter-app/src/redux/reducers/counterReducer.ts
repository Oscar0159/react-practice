import Counter from "../types/counter";
import { CounterActionTypes } from "../actions/counterActions";

const initCounterState: Counter = {
    count: 0
};

const counterReducer = (state = initCounterState, action: any) => {
    switch (action.type) {
        case CounterActionTypes.INCREMENT:
            return {
                count: state.count + 1
            };
        case CounterActionTypes.DECREMENT:
            return {
                count: state.count - 1
            };
        case CounterActionTypes.RESET:
            return {
                count: 0
            };
        default:
            return state;
    }
}

export default counterReducer;