/*
globals fetch
*/
import React, { Component } from 'react'
import toastr from 'toastr'
import Input from './formFields/Input'
import PokemonField from './formFields/PokemonField'

class PokemonForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pokemonName: '',
      pokemonImg: '',
      pokemonInfo: '',
      data: {
        pokemonColection: []
      }
    }

    this.createPokemon = this.createPokemon.bind(this)
  }

  createPokemon (e) {
    e.preventDefault()
    let payload = {
      pokemonName: this.state.pokemonName,
      pokemonImg: this.state.pokemonImg,
      pokemonInfo: this.state.pokemonInfo
    }
    this.create(payload)
  }

  componentDidMount () {
    this.getPokemonList()
  }

  getPokemonList () {
    fetch('http://localhost:5000/pokedex/pokedex')
      .then(data => {
        return data.json()
      })
      .then(data => {
        this.setState({
          data
        })
      })
  }

  create (payload) {
    fetch('http://localhost:5000/pokedex/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        if (!data.success) {
          return toastr.error(data.message, 'Error!')
        }
        toastr.success(data.message, 'Created Successfully')
        this.getPokemonList()
      })
  }

  render () {
    let validObj = {
      validPokemonName: this.state.pokemonName !== '',
      validPokemonImg: this.state.pokemonImg !== '' && this.state.pokemonImg.indexOf('http') === 0,
      validPokemonInfo: this.state.pokemonInfo.length > 3 && this.state.pokemonInfo.length <= 50
    }

    return (
      <div>
        <form onSubmit={this.createPokemon}>
          <fieldset className='App'>
            <div style={{display: 'inline-grid'}}>
              <Input
                type='text'
                data='pokemonName'
                name='Pokemon Name'
                func={e => {
                  this.setState({pokemonName: e.target.value})
                }}
                valid={validObj.validPokemonName}
              />
              <Input
                type='text'
                data='pokemonImg'
                name='Pokemon Image'
                func={e => {
                  this.setState({pokemonImg: e.target.value})
                }}
                valid={validObj.validPokemonImg}
              />
              <Input
                type='text'
                data='pokemonInfo'
                name='Pokemon Info'
                func={e => {
                  this.setState({pokemonInfo: e.target.value})
                }}
                valid={validObj.validPokemonInfo}
              />
              <input
                style={({'display': (validObj.validPokemonName && validObj.validPokemonImg && validObj.validPokemonInfo) === true ? '' : 'none'})}
                type='submit'
                value='Create Pokemon'
              />
            </div>
          </fieldset>
        </form>
        <div style={({ display: 'inline-block' })}>
          {this.state.data.pokemonColection.map((data, index) => (
            <PokemonField key={index} data={data} />
          ))}
        </div>
      </div>
    )
  }
}

export default PokemonForm
