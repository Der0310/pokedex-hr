import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setTrainer } from '../store/slices/trainer.slice';
import { useNavigate } from 'react-router-dom';
import './styles/homepage.css';

const HomePage = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setTrainer(textInput.current.value.toLowerCase().trim()));
    textInput.current.value = '';
    navigate('/pokedex');

  }

  return (
    <div>
      <div className='homepage__container'>
        <div className='homepage__img'>
          <img src="../../pokedex_HomePage.PNG" alt="pokedex__img" />
        </div>
        <h1 className='homepage__greeting'>Hi Trainer!</h1>
        <h2>To start, give me your name</h2>
        <form className='homepage__form' onSubmit={handleSubmit}>
          <input ref={textInput} type="text" />
          <button className='homepage__btn'>Start</button>
        </form>

      </div>
      <footer>
        <img src="../../footer__HomePage.PNG" alt="footerimg" />
      </footer>
    </div>
  )
}

export default HomePage;