import React from 'react'

function RecipeCard({title, calories, image}:any) {
  return (
    <div>
        <h1>{title}</h1>
        <p>{calories}</p>
        <img src={image} alt="" />
    </div>
    
  )
}

export default RecipeCard