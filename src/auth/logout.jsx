import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigation = useNavigate();

    const clear = () => {
        localStorage.removeItem("authHeader");
        localStorage.removeItem("userId");
        
        navigation("/login")
    }

    return (
        <button onClick={clear}>
            Logout
        </button>
    );
}

export default Logout;