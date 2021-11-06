import axios from 'axios';

const customAxios = axios.create({
    baseURL: 'http://superheroapi.com/api/4448923838476647'
});

export default customAxios;