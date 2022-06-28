import {makeAutoObservable, toJS} from "mobx";
import Products from "../../dispatch/products";

export default class StoreProductDetail {

    product = {}

    constructor() {
        makeAutoObservable(this)
    }

    async getProduct(id) {
        try {
            const response = await Products.getById(id)
            response.data.product_color = response.data.product_colors[0]
            this.product = response.data
        } catch (e) {
            console.log(e)
        }
    }

    setColor(color) {
        this.product.product_color = color
    }

    getProductForBasket() {
        this.product.countForBuy = 1
        console.log(toJS(this.product))
        return JSON.parse(JSON.stringify(this.product))
    }
}