import {Context} from "../index";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";

export default function useSearch() {

    const {search} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()

    function handlePress(e) {
        if(e.key === 'Enter') {
            search.setModalSearch(false)
            if (location.pathname === '/search/') {
                search.products_page = search.products_page_input
                search.searchValue_page = search.searchValue_page_input
                if (search.searchValue_page_input === '') {
                    search.products_page = []
                }
            } else {
                search.products_page = search.products
                search.searchValue_page = search.searchValue
                search.products_page_input = search.products
                search.searchValue_page_input = search.searchValue
            }
            navigate(`/search/?search=${e.target.value}`)
        }
    }

    useEffect(() => {
        if (location.pathname !== '/search/') {
            search.isSearchPage = false
        }
        if (location.pathname === '/search/') {
            search.isSearchPage = true
        }
    }, [location])


    return {
        search,
        navigate,
        handlePress,
        location
    }
}

