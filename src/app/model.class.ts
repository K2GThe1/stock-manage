export class Product {

    public  idProduct: number;
    public  name: string;
    public  date: Date;
    public  image: string;
    public  type: string;
    public  entryPrice: number;
    public  sellPrice: number;
    public stocks: Stock[];

    constructor(data: any) {
        Object.assign(this, data);
    }

    get getDate(): Date {
        return new Date(this.date);
    }

}

export class User {
    public  id: number;
    public name: string;
    public password: string;
    public email: string;

    constructor(data: any) {
        Object.assign(this, data);
    }

}

export class Stock {
    public idStock: number;
    public entry: number;
    public sell: number;
    public entryPrice: number;
    public sellPrice: number;
    public date: Date;

    get getDate(): Date {
        return new Date(this.date);
    }
}
