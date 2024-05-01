import { useState } from "react";
import axios from "axios";

const useFetch =() => {

    const [apiData, setapiData] = useState();
    const getApi =(url) => {
        axios.get(url)
        .then(res => setapiData(res.data))
        .catch(err=> console.log(err));

    }
    const getType =(url) => {
        axios.get(url)
        .then(res => setapiData({
            results: res.data.pokemon.map(poke => poke.pokemon),
        }))
        .catch(err => console.log(err));
    }
    return [apiData, getApi, getType];

}

export default useFetch;