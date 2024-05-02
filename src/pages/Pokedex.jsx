import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './styles/pokedex.css';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/homePage/pokedex/PokeCard';
import PokeSelect from '../components/homePage/pokedex/PokeSelect';
import Pagination from '../components/Pagination';


const Pokedex = () => {

  const [selectValue, setSelectValue] = useState('');

  const [inputValue, setinputValue] = useState('');

  const [pokemons, getPokemon, getType] = useFetch();

  const trainer = useSelector(store => store.trainer);

  useEffect(() => {
    if (selectValue) {
      getType(selectValue);
    } else {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=1302';
      getPokemon(url);
    }
  }, [selectValue]);// este es para el selector

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setinputValue(textInput.current.value.toLowerCase().trim());
    textInput.current.value = '';
  }// este es para el input ademas del useRef
  // console.log(pokemons);
  
  const [pokePerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const lastPokemon = currentPage * pokePerPage;
  const firstPokemon = lastPokemon - pokePerPage;

  const pokePage = pokemons?.results?.slice(firstPokemon,lastPokemon);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  

  const pokeSearch = (poke) => {
    const perName = poke.name.includes(inputValue);
    return perName;
  }

  // -------------paginacion del profe---------------//
   // const [page, setPage] =useState()
  // const quantityy =10
  // const total =Math.ceil(pokemons?result.filter(pokerSearch).lengh/5) 
  // const pagination =()=>{
    //const end = quantity*page;
    // const start =end - quantity
    //pokemons?.results.filter(pokeSearch).slice(start, end) return y esto se cambia por pagination en pokedex__container
  //}

  // en return <pagination/> y ver q se hizo la importacion

  



  return (
    <section>
      <header>
        <img src="../../header__img.PNG" alt="headerimg" />
      </header>
      <h2 className='pokedex__title'><span>Welcome {trainer.charAt(0).toLocaleUpperCase()+trainer.slice(1)}, </span>  here you can find your favorite pokemon</h2>
      <div className='pokedex__form'>
        <form onSubmit={handleSubmit}>
          <input ref={textInput} type="text" />
          <button className='pokedex__btn'>Search</button>
        </form>
        <PokeSelect
          setSelectValue={setSelectValue}
        />
      </div>
      <div className='pokedex__container'>
        {
          pokePage?.filter(pokeSearch).map((poke) => (
            <PokeCard
              key={poke.url}
              url={poke.url}
            />
          ))
        }
      </div>
      <Pagination
      pokePerPage={pokePerPage}
      totalPokemon={pokemons?.count}
      paginate={paginate}
      currentPage={currentPage}
      />
    </section>

  )
}

export default Pokedex;