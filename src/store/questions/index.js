import {makeAutoObservable} from "mobx";
import Questions from "../dispatch/questions";

export default class StoreQuestions {

    questions = []

    constructor() {
        makeAutoObservable(this)
    }

    async getQuestions() {
        try {
            const response = await Questions.getAll()
            this.questions = await response.data
        } catch (e) {
            console.log(e)
        }

    }
}