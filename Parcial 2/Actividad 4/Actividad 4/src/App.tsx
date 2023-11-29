import { useState } from 'react'

import './App.css'

type Props ={
  title:string,
  initialN?:number
}


const SimpleState = (props:Props) =>{

  const {title, initialN} = props;

  const [valor, setValor] = useState(initialN?initialN:0);

  function addNumber(){
    setValor(valor + 1)
   
  }
  function addNumber10(){
    setValor(valor + 10)
   
  }
  function addNumber100(){
    setValor(valor + 100)
   
  }
  function lessNumber(){
    setValor(valor - 1)
   
  }
  function lessNumber10(){
    setValor(valor - 10)
   
  }
  function lessNumber100(){
    setValor(valor - 100)
   
  }

  return <>
  <h1>{title}</h1>
  <h2>{valor}</h2>
  
  <button onClick={lessNumber100}> -100 </button> <button onClick={lessNumber10}> -10 </button> <button onClick={lessNumber}> -1 </button> <button onClick={addNumber}> +1 </button> <button onClick={addNumber10}> +10 </button> <button onClick={addNumber100}> +100 </button>
    <br />
    <button> resset </button>

    <br />
    <br />
    <br />

    <h1>Benito Juarez</h1>
    <h2>Benito Juarez es un presidente </h2>
    <fieldset></fieldset>
    <button>Añadir</button>
    </>
    
}

export default SimpleState
