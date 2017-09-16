export class Address {
    public from: string;
    public to: string;
    public data: string;

    public balance: number;
    public gasPrice: number;
    public nonce: number;

    constructor(balance: number, gasPrice: number, nonce: number) {
        this.balance = balance;
        this.gasPrice = gasPrice;
        this.nonce = nonce;
    }

    get gasPriceInGwei(): number {
        return this.gasPrice / 1000000000;
    }
}