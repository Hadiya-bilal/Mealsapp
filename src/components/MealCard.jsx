import React from 'react'

const MealCard = ({mealData, isRandom = false,  onFavoriteToggle, 
  isFavorite = false}) => {
  return (
    <div className="meal">
      <div className="meal-header">
          {isRandom && <span className="random">Meal of kjthe Day</span>}


          <img src={mealData.strMealThumb} alt={mealData.strMeal} 
          />
      </div>
      <div className="meal-body">
          <h3>{mealData.strMeal}</h3>


          <button className={`fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => onFavoriteToggle(mealData.idMeal)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
              <i className="fas fa-heart"></i>
          </button>
      </div>
    </div>
  )
}

export default MealCard;
