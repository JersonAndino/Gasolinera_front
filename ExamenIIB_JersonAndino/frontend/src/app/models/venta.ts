export class Venta{
    constructor(
        public _id:string,
        public cedula:string,
        public tipo:string,
        public cantidad:number,
        public total:number,
    ){}
}