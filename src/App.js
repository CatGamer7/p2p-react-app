import Navbar from './navbar';
import './App.css';
import Main from './main';
import Footer from './footer'

const App = () => {
    return (
        <div>
            <Navbar login={localStorage.getItem("userId")}/>
            <Main/>
            <Footer/>
        </div>
    );
};

export default App;