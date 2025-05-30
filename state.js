

export class State {
    static state = new Object();
    
    constructor() {
        
    }

    add(new_id,new_data) {
        if (State.state.hasOwnProperty(new_id)) {
        }
        else {
        State.state[new_id] = new_data;
        }
    }

    getState(){
        return State.state;
    }

    hasArtID(new_id){
        return State.state.hasOwnProperty(new_id);
    }

    removeID(new_id){
        delete State.state[new_id]
    }

}