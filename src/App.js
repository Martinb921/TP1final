import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import {CountryDropdown} from 'react-country-region-selector';
import CreditCardInput from 'react-credit-card-input';
import Cards from 'react-credit-cards';
//https://www.npmjs.com/package/card-validator 

class App extends Component {

  container = null;
  state = {
    nombre: '',
    email: '',
    pais: '',
    tipo: '',
    cardNum: '',
    cardExp: '',
    cardCvv: '',
    error: false,
    completo: false,
  };

  cambiarTipo = (tipo) => {this.setState({tipo})}

  validarDatos = () => {
    const {tipo, nombre, email, pais, numeroTarjeta, fechaVencimiento, cvv } = this.state;

    this.ocultarError();

    if (nombre.length < 4 || nombre.indexOf(' ') === -1) {
      this.mostrarError();
      return;
    }
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1){
      this.mostrarError();
      return;
    }
    if (pais === ''){
      this.mostrarError();
      return;
    }



    this.crearUsuario();

  }

  ocultarError = () => {
    this.setState({ error: false })
  }

  mostrarError = () => {
    this.setState({ error: true })
  }

  crearUsuario = () => {
  fetch('https://server-subscripcion-jsbrbnwqfv.now.sh/subscripciones', {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(this.state), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => this.setState ({completo: true}))
  }

  render() {
    const {error, tipo, nombre, email, pais, cardNum, cardExp, cardCvv, completo } = this.state;
       ;

       if (completo){
        return(<div className="CuentaOk"><h1>Cuenta creada con éxito</h1></div>)
      }

    return (
      <div className="App">
        <header className="App-header">
             <h1 className="App-title">Disfrutá de nuestra promoción!!</h1>
        </header>
        <p className="App-intro">
        <Button variant="contained" color="primary" onClick={() => this.cambiarTipo('free')}>
        Gratis
        </Button>
        <Button variant="contained"  color="secondary" onClick={() => this.cambiarTipo('premium')}>
        Premium a solo $10
        </Button>
        
    {(error) && <div><h2>Por favor revisar los datos ingresados!</h2></div>}
  <section>
    {(tipo!="") &&
    <div className= "Campos">
           <form className="Datos">
                <h1><u>Ingresa tus datos:</u></h1>
                Nombre Apellido:
                <input placeholder="Ej: Pablo Perez"nombre onChange={(event) => this.setState({ nombre: event.target.value })}></input>
                <br></br>Email:<input placeholder="Ej: abcd@efgh.com" email onChange={(event) => this.setState({ email: event.target.value })}></input>
                <br></br><br></br>País: <CountryDropdown onChange={(pais) => this.setState({ pais })} value={pais}></CountryDropdown>
                </form>     
        </div>
    }
  {(tipo==="premium") &&
    <div className= "Campos">
           <form className="Datos">
                <h1><u>Datos de tarjeta de crédito:</u></h1>
                <CreditCardInput cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
      <input className='card' {...props} onChange={handleCardCVCChange(e => this.setState({ cardCvv: e.target.value }))}/>)}
    cardExpiryInputRenderer={({handleCardExpiryChange,props}) => (
      <input {...props} onChange={handleCardExpiryChange(e => this.setState({ cardExp: e.target.value }))}/>)}
    cardNumberInputRenderer={({handleCardNumberChange,props}) => (
      <input {...props} onChange={handleCardNumberChange(e => this.setState({ cardNum: e.target.value }))}/>)}/>
                  </form>
        </div>
    }
</section>
  {(tipo==="premium" || tipo==="free") &&
    <Button variant="contained" size= "large" color="secondary" onClick={() => this.validarDatos()}>
      Crear Cuenta
      </Button>
  }
        </p>
      </div>
    );
  }
}

export default App;

