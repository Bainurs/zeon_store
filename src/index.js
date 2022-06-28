import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
//mobx states
import StoreBestsellers from "./store/products/bestsellers";
import StoreNovelties from "./store/products/novelties";
import StoreMainCollections from "./store/collections/main";
import StoreCollections from "./store/collections";
import StoreCollectionsDetail from "./store/collections/detail";
import StoreProductDetail from "./store/products/details";
import StoreNews from "./store/news";
import StoreQuestions from "./store/questions"
import StoreSearch from "./store/search"
import StoreFavorites from "./store/favorites"
import StoreCart from "./store/cart"


const bestsellers = new StoreBestsellers()
const novelties = new StoreNovelties()
const collectionsMain = new StoreMainCollections()
const collectionsPage = new StoreCollections()
const collectionsDetail = new StoreCollectionsDetail()
const productDetail = new StoreProductDetail()
const news = new StoreNews()
const questions = new StoreQuestions()
const search = new StoreSearch()
const favorites = new StoreFavorites()
const shoppingCart = new StoreCart()

export const Context = createContext({
    bestsellers,
    novelties,
    collectionsMain,
    collectionsPage,
    collectionsDetail,
    productDetail,
    news,
    questions,
    search,
    favorites,
    shoppingCart,
})

favorites.init()
shoppingCart.init()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        bestsellers,
        novelties,
        collectionsMain,
        collectionsPage,
        collectionsDetail,
        productDetail,
        news,
        questions,
        search,
        favorites,
        shoppingCart,
    }}>
    <App/>
    </Context.Provider>
);
