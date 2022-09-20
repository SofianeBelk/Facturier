import { HasPrint } from "../interfaces/HasPrint.js";

export class Print implements HasPrint{

    constructor(private e1: HTMLDivElement){

    }


    print(): void {
       document.body.innerHTML = this.e1.innerHTML;
       window.print();
       document.location.reload();
    }
    
}