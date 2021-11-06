import {
    SEARCH_HERO_START,
    SEARCH_HERO_OK,
    SEARCH_HERO_ERROR,
    ADD_HERO_TEAM,
    ADD_HERO_TEAM_ERROR,
    POWER_STATS_TEAM,
    HEIGHT_WEIGHT,
    DELETE_HERO,
} from '../types';

import customAxios from '../config/axios';

export function searchHeros(value) {
    //console.log(name);
    const { name } = value;
    return async (dispatch) => {
        dispatch( startSearch() );

        try {
            const result = await customAxios.get(`/search/${name}`);
            const heros = result.data.results;
            // console.log(result.data);
            dispatch( startSearchOk(heros));
            if (result.data.error) {
                dispatch(checkName(result.data.error));
                setTimeout(() => {
                    dispatch({
                      type: SEARCH_HERO_ERROR,
                      payload: "",
                    });
                }, 3000);
            }
        } catch (error) {
            dispatch( startSearchError());
        }
    }
}

const startSearch = () => ({ //para agregar spinner
    type: SEARCH_HERO_START,
    payload: true
});

const startSearchOk = heros => ({
    type: SEARCH_HERO_OK,
    payload: heros,
})

const startSearchError = () => ({
    type: SEARCH_HERO_ERROR,
    payload: "Hero does not exist",
});

const checkName= (msg) => ({ //para agregar spinner
    type: SEARCH_HERO_ERROR,
    payload: msg
});

export function addHeroTeam (id) {
    return async (dispatch, getState) => {

        const { heros, team } = getState().hero; //trae todo el state actual

        const hero = heros.filter((hero) => hero.id === id); // verifica si existe heroe
        //console.log(heroExist);

        if (team.length === 6) {
            dispatch(checkAmountTeam());
            setTimeout(() => {
                dispatch({
                  type: ADD_HERO_TEAM_ERROR,
                  payload: "",
                });
              }, 3000);
            return;
        }
           
        const heroIsTeam = team.map((hero) => hero.id === id); // verifica si existe heroe en el team

        if (heroIsTeam.includes(true)) {
            dispatch(checkHeroTeam());
            setTimeout(() => {
                dispatch({
                    type: ADD_HERO_TEAM_ERROR,
                    payload: "",
                });
                }, 3000);
            return;

        } else {

            if (hero[0].biography.alignment === "good") {
                const isGood = team.filter((hero) => hero.biography.alignment === "good");

                if (isGood.length === 3) {
                    dispatch(checkAmountGood());
                    setTimeout(() => {
                        dispatch({
                          type: ADD_HERO_TEAM_ERROR,
                          payload: "",
                        });
                    }, 3000);
                    return;
                } else {
                    dispatch(addHero(hero[0]));   
                }

            } else if (hero[0].biography.alignment === "bad") {
                const isBad = team.filter((hero) => hero.biography.alignment === "bad");

                if (isBad.length === 3) {
                    dispatch(checkAmountBad());
                    setTimeout(() => {
                        dispatch({
                          type: ADD_HERO_TEAM_ERROR,
                          payload: "",
                        });
                    }, 3000);
                    return;
                } else {
                    dispatch(addHero(hero[0]));   
                }
            }
        }    
    }
}

const checkAmountTeam = () => ({ 
    type: ADD_HERO_TEAM_ERROR,
    payload: "Your team is Complete",
});

const checkHeroTeam = () => ({ 
    type: ADD_HERO_TEAM_ERROR,
    payload: "Hero is already in your team",
});

const checkAmountGood = () => ({ 
    type: ADD_HERO_TEAM_ERROR,
    payload: "To many GOOD Heroes",
});

const checkAmountBad = () => ({ 
    type: ADD_HERO_TEAM_ERROR,
    payload: "To many BAD Heroes",
});

const addHero = (hero) => ({ 
    type: ADD_HERO_TEAM,
    payload: hero,
});

export function powerStatsTeam () {
    return async (dispatch, getState) => {

        const { team } = getState().hero;
        var height = 0;
        var weight = 0;
        
        team.forEach((hero) => {
            //Suma de la altura y peso de todos los heroes.
            if (Number(hero.appearance.height[1].slice(0, 3)) && Number(hero.appearance.weight[1].slice(0, 3))){
                height += Number(hero.appearance.height[1].slice(0, 3));
                weight += Number(hero.appearance.weight[1].slice(0, 3));
            }
            
            const heightProm = (height/team.length).toFixed(2);
            const weightProm = (weight/team.length).toFixed(2);
    
            dispatch({
                type: HEIGHT_WEIGHT,
                payload: {heightProm, weightProm },
            });
            
            //Validar si no tiene un valor asignarle 0.
            if (hero.powerstats.durability === "null") hero.powerstats.durability = 0;
            if (hero.powerstats.intelligence === "null")hero.powerstats.intelligence = 0;
            if (hero.powerstats.strength === "null") hero.powerstats.strength = 0;
            if (hero.powerstats.power === "null") hero.powerstats.power = 0;
            if (hero.powerstats.speed === "null") hero.powerstats.speed = 0;
            if (hero.powerstats.combat === "null") hero.powerstats.combat = 0;

            dispatch({
                type: POWER_STATS_TEAM,
                payload: hero.powerstats,
            });
        });
    };
};

export function deleteHero (id) {
    // console.log(id)
    return async (dispatch) => {
        dispatch({
            type: DELETE_HERO,
            payload: id,
          });  
    }
}







