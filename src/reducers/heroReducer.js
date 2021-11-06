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

const initialState = {
    team: [],
    heros: [],
    errorSearch: "",
    errorTeam: [],
    loading: false,
    powerstats: {
        strength: 0,
        intelligence:0,
        speed: 0,
        durability: 0,
        power: 0,
        combat: 0, 
    },
    heightTeam: 0,
    weightTeam: 0, 
}

export default function heroReducer (state = initialState, action) {
    switch(action.type) {
        case SEARCH_HERO_START: 
            return {
                ...state,
                loading: action.payload
            }
        case SEARCH_HERO_OK: 
            return {
                ...state,
                loading: false,
                heros: action.payload,
            }
        case SEARCH_HERO_ERROR: 
            return {
                ...state,
                loading: false,
                errorSearch: action.payload,
            }
        case ADD_HERO_TEAM: 
            return {
                ...state,
                powerstats: {
                    intelligence: 0,
                    strength: 0,
                    speed: 0,
                    durability: 0,
                    power: 0,
                    combat: 0,
                },
                team: [...state.team, action.payload],
        }
        case ADD_HERO_TEAM_ERROR: 
            return {
                ...state,
                errorTeam: action.payload,
        }
        case POWER_STATS_TEAM: 
            return {
                ...state,
                powerstats: {
                    intelligence: state.powerstats.intelligence + Number(action.payload.intelligence),
                    strength: state.powerstats.strength + Number(action.payload.strength),
                    speed: state.powerstats.speed + Number(action.payload.speed),
                    durability: state.powerstats.durability + Number(action.payload.durability),
                    power: state.powerstats.power + Number(action.payload.power),
                    combat: state.powerstats.combat + Number(action.payload.combat),
                }, 
        }
        case HEIGHT_WEIGHT: 
            return {
                ...state,
                    weightTeam: action.payload.weightProm,
                    heightTeam: action.payload.heightProm,
        }

        case DELETE_HERO: 
            return {
                ...state,
                powerstats: {
                    intelligence: 0,
                    strength: 0,
                    speed: 0,
                    durability: 0,
                    power: 0,
                    combat: 0,
                },
                team: [...state.team.filter((hero) => hero.id !== action.payload)],
        }
        default:
            return state;
    }
}