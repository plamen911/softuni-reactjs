import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Catalog from '../appElements/Catalog'
import Submit from '../appElements/Submit'
import MyPosts from '../appElements/MyPosts'
import Details from '../appElements/Details'
import Edit from '../appElements/Edit'

const ViewComponent = () => {
  return (
    <Switch>
      <Route exact path='/' component={Catalog} />
      <Route path='/catalog' component={Catalog} />
      <Route path='/submit' component={Submit} />
      <Route path='/myPosts' component={MyPosts} />
      <Route path='/details/:id' component={Details} />
      <Route path='/edit/:id' component={Edit} />
    </Switch>
  )
}

export default ViewComponent
