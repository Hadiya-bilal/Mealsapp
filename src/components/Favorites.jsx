const Favorites = ({ favoriteMeals = [], onRemoveFavorite }) => {
  return (
    <div className="favorites-section">
      <h3>Favorites</h3>
      {favoriteMeals.length > 0 ? (
        <ul className="favorites">
          {favoriteMeals.map(meal => (
            <li key={meal.idMeal}>
              <img 
                id="fav-img" 
                src={meal.strMealThumb} 
                alt={meal.strMeal}
              />
              <span>{meal.strMeal}</span>
              <button 
                className="clear"
                onClick={() => onRemoveFavorite(meal.idMeal)}
              >
                <i className="fas fa-window-close"></i>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites yet</p>
      )}
    </div>
  );
};

export default Favorites;
// This component displays a list of favorite meals.
// It takes in a list of favorite meals and a function to remove a meal from favorites.
// If there are no favorite meals, it displays a message indicating that.
// The component uses a simple list to display the meals, with an image, name, and a button to remove the meal from favorites.