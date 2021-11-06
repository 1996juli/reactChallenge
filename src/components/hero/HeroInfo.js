import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory, useLocation} from 'react-router-dom'

const HeroInfo = () => {

    const location = useLocation();
    const history = useHistory();
    const authenticated = useSelector((state) => state.auth.authenticated);
    const { heros } = useSelector((state) => state.hero);

    useEffect(() => {
        if (!authenticated){
            history.push("/login"); 
        }
    }, [authenticated, history]);

    if (heros.length === 0) return <div>No Hero</div>;
    
    const heroSelect = heros.filter((hero) => hero.id === location.state.id);

    console.log(heroSelect);

    const { image, name, biography, appearance, work } = heroSelect[0];

    return (
        <>
            <div className="container mt-5">

                <div className="row">

                    <div className=" col-md-6 col-sm-10">
                        <img src={image.url} className="img-fluid" alt="hero-imagen" />
                    </div>

                    <div className="col-md-6 col-sm-10 d-flex align-items-center text-white">

                        <div className='fs-4'>
                            <h1 className="text-uppercase text-center py-5">{name}</h1>

                            <p>
                            <span className="text-danger"> Height : </span>
                                {appearance.height.map((h) => (
                                    <span key={h}> {h}, </span>
                                ))}
                            </p>

                            <p>
                            <span className="text-danger"> Weight : </span>
                                {appearance.weight.map((w) => (
                                    <span key={w}>{w}, </span>
                                ))}
                            </p>

                            <p>
                            <span className="  text-danger"> Aliases : </span>
                                {biography.aliases.map((alias) => (
                                    <span key={alias}> {alias}, </span>
                                ))}
                            </p>

                            <p>
                            <span className="text-danger"> Eyed Color : </span>
                                {appearance["eye-color"]}
                            </p>

                            <p>
                            <span className="text-danger"> Hair Color : </span>
                                {appearance["hair-color"]}
                            </p>
                            
                            <p>
                            <span className="text-danger">  Work Base : </span>
                                {work.base}
                            </p>
                            
                            <div className="d-block btn btn-outline-danger px-5">
                                <Link to="/" className="text-light text-decoration-none fs-4">Go Back</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroInfo;