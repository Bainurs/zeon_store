import {makeAutoObservable} from "mobx";

export default class StoreFavorites {

    products = []

    constructor() {
        makeAutoObservable(this)
    }

    init() {
        this.products = this.getLocalStorage()
    }

    add(product) {
        this.products = [...this.products, product]
        this.setLocalStorage()
    }

    delete(product) {
        this.products = this.products.filter((item) => item.id !== product.id)
        this.setLocalStorage()
    }



    getLocalStorage() {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        if (favorites) {return favorites} else {return []}
    }

    setLocalStorage() {
        localStorage.setItem('favorites', JSON.stringify(this.products))
    }

}