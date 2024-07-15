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
                navigation("/not-found");
                return;
            }
            else if (res.status === 401) {
                navigation("/login");
                return;
            }
            
            return res.json();
        })
        .catch((error) => {
            if (!(error instanceof SyntaxError)) {
                throw error;
            }
        })
    }
}

export default useAuthFetch