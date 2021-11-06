import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addHeroTeam, deleteHero } from '../../action/heroAction';
import "./hero.css";
import Error from "../Error";
import PorwerStats from "./PowerStats";

const Hero = ({ hero, homeHero }) => {

    const dispatch = useDispatch();
    const { errorTeam } = useSelector((state) => state.hero);

    return (
        <div className="d-flex justify-content-center">
            <div className="card"> 
                <div className="card-father">
                    <div className="card-front">
                        <h5 className="hero-name">{hero.name}</h5>
                        <img
                            src={hero.image.url}
                            style={{ width: "18rem", height: "25rem" }}
                            alt="Heroe"
                        />
                    </div>

                    {/* detras de la card */}
                    <div className="card-back text-white"> 
                        <h3 >{hero.name}</h3>

                        <p> He is a {hero.biography.alignment} Hero </p>

                        <div className="px-3">
                           <PorwerStats powerStats={hero.powerstats} /> 
                        </div>

                        {errorTeam.length > 0 && homeHero && <Error error={errorTeam} />}
                            
                        <div className="d-flex justify-content-evenly pt-5">

                            <Link to={{ pathname: "/HeroInfo", state: {id:hero.id}  }} className="btn btn-primary mr-2">
                                See More
                            </Link>

                            {homeHero ? (
                                
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => dispatch(addHeroTeam(hero.id))}
                                >
                                add to team
                            </button>

                                ) : (

                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => dispatch(deleteHero(hero.id))}
                                >
                                delete
                            </button>

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;