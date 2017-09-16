export class Transaction {

    nonce: number;
    gasPrice: number;
    gasLimit: number;
    from: string = '';
    to: string = '';
    value: number;
    data: string;
    chainId: number;

    get gasPriceInGwei(): number {
        return this.gasPrice / 1000000000;
    }

}