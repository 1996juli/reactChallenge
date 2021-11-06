import React, { useEffect }  from 'react';
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import Header from "./layout/Header";
import Search from "./layout/Search";
import Spinner from "./spinner/Spinner";
import Hero from "./hero/Hero";
import Team from "./team/Team";
import { isAuthenticated } from '../action/authAction';

const Home = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, heros} = useSelector((state) => state.hero);
    const { authenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if(!authenticated) {
            history.push('/login');
        } 
    }, [authenticated, history]);

    useEffect(() => {
        dispatch(isAuthenticated());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ( 
        <>
            <div className="bg-img">
               <Header/> 
            </div>
            
            <div className="container mt-3">
                <Search/>
            </div>
            
            {loading && (<div className="d-flex justify-content-center mt-5"><Spinner/></div>)}
            
            <div className="container justify-content-center mt-4 pt-5">
                <div className="row">
                    {heros &&
                        heros.map((hero) => (
                            <div
                               key={hero.id}
                               className="pl-5 mb-5 col-xl-4 col-md-6 col-sm-12" 
                            >
                            <Hero hero={hero} homeHero={true} />
                        </div>
                    ))}
                </div> 
            </div>

            <Team/>
        </>
    );
}
 
export default Home;