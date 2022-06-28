import {makeAutoObservable} from "mobx";
import Products from "../../dispatch/products";

export default class StoreBestsellers {

    products = []
    limit= 8
    offset = 0
    step = 0
    isLast = false
    count = 0

    constructor() {
        makeAutoObservable(this)
    }

    async getProducts() {
        try {
            const response = await Products.getAll()
            this.products = await response.data.results
        } catch (e) {
            console.log(e)
        }
        
    }

    async getNext() {
        try {
            this.limit = 4
            if (this.step === 0) {
                this.step = this.step + 1
                this.offset = 8
            } 
            if (this.step > 0) {
                this.offset = this.offset + 4
            }
            const response = await Products.getAll(this.limit, this.offset)
            this.products = this.products.concat(response.data.results)
            this.count = response.data.count
            if(this.products.length === this.count) {
                this.isLast = true
            }
        } catch (e) {
            console.log(e)
        }
    }
}