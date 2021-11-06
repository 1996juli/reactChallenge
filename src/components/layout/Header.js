import React from 'react';
import { useDispatch} from "react-redux";
import { logout } from '../../action/authAction';
import { Link } from 'react-router-dom';

const Header = () => {

    const dispatch = useDispatch();
  
    return (
        <>
            <div className="container d-flex justify-content-end">
                <nav className="navbar">
                    
                    <Link to={'/'} className="text-light text-decoration-none mx-3 btn btn-dark">
                        Home
                    </Link>

                    <button
                        className="btn btn-dark"
                        onClick={() => {
                            dispatch(logout());
                        }} 
                    >
                        Log Out
                    </button>
                </nav>
                
            </div>
            
            <div className="d-flex justify-content-center mt-5 pt-5">
                <h1 className="display-3 text-light bg-dark rounded-2 px-3 py-1 text-uppercase text-center">
                    Create your team of heros
                </h1>
            </div>   
        </>

    );
}
 
export default Header;