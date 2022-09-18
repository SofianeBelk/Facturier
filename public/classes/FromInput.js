import { Datas } from "../classes/Datas.js";
import { Display } from "./Display.js";
export class FromInput {
    constructor() {
        this.form = document.getElementById('form');
        this.type = document.getElementById('type');
        this.firstName = document.getElementById('firstName');
        this.lastName = document.getElementById('lastName');
        this.address = document.getElementById('address');
        this.country = document.getElementById('country');
        this.town = document.getElementById('town');
        this.zip = document.getElementById('zip');
        this.product = document.getElementById('product');
        this.price = document.getElementById('price');
        this.quantity = document.getElementById('quantity');
        this.tva = document.getElementById('tva');
        this.docContainer = document.getElementById("document-container");
        this.hiddenDiv = document.getElementById("hiddenDiv");
        this.btnPrint = document.getElementById('print');
        //Appel au Listener
        this.submitFormListener();
    }
    //Listener
    submitFormListener() {
        this.form.addEventListener('submit', this.handlFormSubmit.bind(this));
    }
    handlFormSubmit(e) {
        e.preventDefault();
        const inputs = this.inputDatas();
        if (Array.isArray(inputs)) {
            console.log(...inputs);
            let docData = new Datas(this.type.value, this.firstName.value, this.lastName.value, this.address.value, this.country.value, this.town.value, this.zip.valueAsNumber, this.product.value, this.price.valueAsNumber, this.quantity.valueAsNumber, this.tva.valueAsNumber, new Date());
            let template = new Display(this.docContainer, this.hiddenDiv, this.btnPrint);
            template.render(docData, this.type.value);
        }
    }
    inputDatas() {
        const type = this.type.value;
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const address = this.address.value;
        const country = this.country.value;
        const town = this.town.value;
        const zip = this.zip.valueAsNumber;
        const product = this.product.value;
        const price = this.price.valueAsNumber;
        const quantity = this.quantity.valueAsNumber;
        const tva = this.tva.valueAsNumber;
        if (zip > 0 && quantity > 0 && price > 0 && tva > 0) {
            return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva];
        }
        else {
            alert("Les valeurs numériques doivent être suppérieur a zéro");
            return;
        }
        return;
    }
}
