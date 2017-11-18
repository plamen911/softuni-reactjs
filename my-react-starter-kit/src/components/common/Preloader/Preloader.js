import React from 'react'
import './Preloader.css'

const preloader = ({loading}) => {
  if (!loading) return null
  return (
    <div className="preloader">
      {loading && <p>Loading &hellip;</p>}
    </div>
  )
}

export default preloader
