import { useNavigate } from "react-router-dom"

const useAuthFetch = () => {
    const navigation = useNavigate();

    return (url, body) => {

        if (localStorage.getItem("authHeader") === null) {
            navigation("/login");
        }

        if (!("headers" in body)) {
            body["headers"] = {};
        }

        body["headers"]["Authorization"] = localStorage.getItem("authHeader");

        return fetch(
            url, 
            body
        )
        .then((res) => {
            if (res.status === 404) {
                navigation("/not-found")
                return 
            }
            
            return res.json();
        })
    }
}

export default useAuthFetch