import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigation = useNavigate();

    const clear = () => {
        localStorage.removeItem("authHeader");
        localStorage.removeItem("userId");
        
        navigation("/login");
        navigation(0); //Disgusting, but it refreshes navbar
    }

    return (
        <a href="#" onClick={clear} className="py-2">
            Выйти
        </a>
    );
}

export default Logout;