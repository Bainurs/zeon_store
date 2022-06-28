import {makeAutoObservable} from "mobx";
import Products from "../../dispatch/products";
import pagination from "../../../utils/pagination";

export default class CollectionDetail {

    products = []
    limit= 8
    offset = 0
    count = null
    pagesArray = null
    pages_quantity = null
    current_page = 1

    constructor() {
        makeAutoObservable(this)
    }

    async getProducts() {
        try {
            const response = await Products.getAll(this.limit)
            this.count = await response.data.count
            this.pages_quantity = Math.ceil(response.data.count / this.limit)
            this.pagesArray = pagination(this.pages_quantity, this.current_page)
            this.products = await response.data.results
        } catch (e) {
            console.log(e)
        }
    }

    async getNext() {
        if (this.current_page + 1 <= this.pages_quantity) {
            this.offset = this.offset + 8
            const response = await Products.getAll(this.limit, this.offset)
            this.products = response.data.results
            this.pagesArray = pagination(this.pages_quantity, this.current_page + 1, this.current_page - 1)
            this.current_page += 1
        }
    }
    async getPrev() {
        if (this.current_page - 1 >= 1) {
            this.offset = this.offset - 8
            const response = await Products.getAll(this.limit, this.offset)
            this.products = response.data.results
            this.pagesArray = pagination(this.pages_quantity, this.current_page -1, this.current_page + 1)
            this.current_page -= 1
        }
    }

    async setPage(page) {
        let oldPage = this.current_page
        this.offset = this.limit * (page - 1)
        this.pagesArray = pagination(this.pages_quantity, page, oldPage)
        this.getPage()
        this.current_page = page
    }

    async getPage() {
        const response = await Products.getAll(this.limit, this.offset)
        this.products = response.data.results
    }
}