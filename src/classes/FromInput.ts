import { HasHtmlFormat } from "../interfaces/HasHtmlFormat.js";
import { Datas } from "../classes/Datas.js";
import { HasRender } from "../interfaces/HasRender.js";
import { Display } from "./Display.js";
import { HasPrint } from "../interfaces/HasPrint.js";
import { Print } from "./Print.js";

export class FromInput{
    form : HTMLFormElement;
    type :  HTMLSelectElement;
    firstName : HTMLInputElement;
    lastName :  HTMLInputElement;
    address :  HTMLInputElement;
    country :  HTMLInputElement;
    town :  HTMLInputElement;
    zip :  HTMLInputElement;
    product :  HTMLInputElement;
    price :  HTMLInputElement;
    quantity :  HTMLInputElement;
    tva : HTMLInputElement;
    docContainer: HTMLDivElement;
    hiddenDiv: HTMLDivElement;
    btnPrint: HTMLButtonElement;
    btnReload: HTMLButtonElement;
    btnStoredInvoices: HTMLButtonElement;
    btnStoredestimates: HTMLButtonElement;
    storedData: HTMLDivElement;

    constructor(){
        this.form = document.getElementById('form') as HTMLFormElement;
        this.type = document.getElementById('type') as HTMLSelectElement;
        this.firstName = document.getElementById('firstName') as HTMLInputElement;
        this.lastName = document.getElementById('lastName') as HTMLInputElement;
        this.address = document.getElementById('address') as HTMLInputElement;
        this.country = document.getElementById('country') as HTMLInputElement;
        this.town = document.getElementById('town') as HTMLInputElement;
        this.zip = document.getElementById('zip') as HTMLInputElement;
        this.product = document.getElementById('product') as HTMLInputElement;
        this.price = document.getElementById('price') as HTMLInputElement;
        this.quantity = document.getElementById('quantity') as HTMLInputElement;
        this.tva = document.getElementById('tva') as HTMLInputElement;

        this.docContainer = document.getElementById("document-container") as HTMLDivElement;
        this.hiddenDiv = document.getElementById("hiddenDiv") as HTMLDivElement;
        this.storedData = document.getElementById('stored-data') as HTMLDivElement;
       
        this.btnPrint = document.getElementById('print') as HTMLButtonElement;
        this.btnReload = document.getElementById('reload') as HTMLButtonElement;

        this.btnStoredInvoices = document.getElementById('stored-invoices') as HTMLButtonElement;
        this.btnStoredestimates = document.getElementById('stored-estimates') as HTMLButtonElement;

        //Appel au Listener
        this.submitFormListener();
        this.printListener(this.btnPrint, this.docContainer);
        this.deleteListener(this.btnReload);
        this.getStoredDocsListener();
    }

    //Listener
    private submitFormListener():void{
        this.form.addEventListener('submit',this.handlFormSubmit.bind(this))
    }

    private printListener(btnPrint: HTMLButtonElement, docContainer: HTMLDivElement):void{
        btnPrint.addEventListener('click',()=>{
            let avalaibleDoc: HasPrint = new Print(docContainer);
            avalaibleDoc.print();
        })
    }

    private deleteListener(btnReload: HTMLButtonElement):void{
        btnReload.addEventListener('click',()=>{
            document.location.reload();
            window.scrollTo(0,0);
        })
    }

    private getStoredDocsListener():void{
        this.btnStoredInvoices.addEventListener('click',this.getItems.bind(this,'invoice'))
        this.btnStoredestimates.addEventListener('click',this.getItems.bind(this,'estimate'))

    }

    private getItems(docType: string){
        if(this.storedData.hasChildNodes()){
            this.storedData.innerHTML = "";
        }
        if(localStorage.getItem(docType)){
            let array: string | null;
            array = localStorage.getItem(docType);
            console.log("Array : "+ array?.toString())

            if(array !== null && array.length > 2){
                let arrayData: string[];
                arrayData = JSON.parse(array);
                
                arrayData.map((doc: string): void => {
                    let card: HTMLDivElement = document.createElement('div');
                    let cardBody: HTMLDivElement = document.createElement('div');
                    let cardClasses: Array<string> = ['card', 'mt-5'];
                    let cardBodyClasses: string = 'card-body';
                    card.classList.add(...cardClasses);
                    cardBody.classList.add(cardBodyClasses);

                    cardBody.innerHTML = doc;
                    card.append(cardBody);
                    this.storedData.append(card);
                })
            }else{
                this.storedData.innerHTML = '<div class="p-5>Aucune data disponible</div>';
            }
        }
        
    }

    private handlFormSubmit(e: Event){
        e.preventDefault();
        const inputs = this.inputDatas();
        if(Array.isArray(inputs)){
            console.log(...inputs);

            let docData: HasHtmlFormat = new Datas(
                this.type.value,
                this.firstName.value,
                this.lastName.value,
                this.address.value,
                this.country.value,
                this.town.value,
                this.zip.valueAsNumber,
                this.product.value,
                this.price.valueAsNumber,
                this.quantity.valueAsNumber,
                this.tva.valueAsNumber,
                new Date()
            );
            
            let template: HasRender = new Display(this.docContainer, this.hiddenDiv, this.btnPrint);
            template.render(docData, this.type.value);


        }
    }

    private inputDatas(): [string,string,string,string,String,string,number,string,number,number,number] | void{
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

        if(zip > 0 && quantity > 0 && price > 0 && tva > 0){
            return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva]
        }else{
            alert("Les valeurs num??riques doivent ??tre supp??rieur a z??ro");
            return;
        }
        return ;
    }
}