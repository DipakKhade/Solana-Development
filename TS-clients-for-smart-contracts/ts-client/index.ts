import * as borsh from "borsh-js";

class Counter{
    counter:number;

    constructor({counter}:{counter:number}){
        this.counter = counter;
    }
}

const schema : borsh.schema = {
    struct:{
        counter:'u32'
    }
}