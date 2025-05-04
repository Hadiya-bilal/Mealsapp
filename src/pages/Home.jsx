import Search from "../components/Search";
import Favorites from "../components/Favorites";
import MealCard from "../components/MealCard";
import { useEffect, useState } from "react";

const RANDOM_API = import.meta.env.VITE_RANDOM_MEAL_API;
const MEAL_BYID_API = import.meta.env.VITE_MEAL_BYID_API;
const SEARCH_API = import.meta.env.VITE_SEARCH_MEAL_API;

const Home = () => {
  const [randomMeal, setRandomMeal] = useState(null);
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadRandomMeal();
      } catch (err) {
        setError("Failed to load meals. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);




  const loadRandomMeal = async () => {
    try {
      const resp = await fetch(RANDOM_API);
      if (!resp.ok) throw new Error("Network response was not ok");
      
      const data = await resp.json();
      if (!data.meals || !data.meals[0]) throw new Error("No meals found");
      
      setRandomMeal(data.meals[0]);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getMealById = async (id) => {
    try {
      const resp = await fetch(`${MEAL_BYID_API}${id}`);
      if (!resp.ok) throw new Error("Network response was not ok");
      
      const data = await resp.json();
      return data.meals?.[0] || null;
    } catch (err) {
      console.error("Failed to fetch meal by ID:", err);
      return null;
    }
  };



  // Search functionality handlers, to be used in Search component,  
  // makes an API call to fetch meals based on the search term


  const handleSearch = async (term) => {

  const searchQuery = term.trim();
  setSearchTerm(searchQuery);  
  if (!searchQuery) {
    setSearchResults([]);
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(`${SEARCH_API}${encodeURIComponent(searchQuery)}`);
    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }

    const data = await response.json();
    setSearchResults(data.meals || []);
  } 
  
  catch (error) {

    console.error("Error fetching search results:", error);
    setSearchResults([]);
    setError("Failed to fetch search results. Please try again.");
  } 
  finally {
    setLoading(false);
  }
  };





  const toggleFavorite = async (mealId) => {
    try {
      if (favoriteMealIds.includes(mealId)) {
        // Removes from favorites
        setFavoriteMeals(prev => prev.filter(meal => meal.idMeal !== mealId));
        setFavoriteMealIds(prev => prev.filter(id => id !== mealId));
      } else {
        // Adds to favorites
        const meal = await getMealById(mealId);
        if (meal) {
          setFavoriteMeals(prev => [...prev, meal]);
          setFavoriteMealIds(prev => [...prev, mealId]);
        }
      }
    } catch (err) {
      console.error("Failed to update favorites:", err);
    }
  };

  if (loading) return <div className="loading">Loading meals...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="store">
      <Search onSearch={handleSearch}/>
      
      <Favorites 
        favoriteMeals={favoriteMeals} 
        onRemoveFavorite={toggleFavorite} 
      />


    
      <div className="meals" id="meals">

      {searchTerm ? (
          // Displaying search results if search term exists
          searchResults.map(meal => (
            <MealCard 
              key={meal.idMeal}
              mealData={meal}
              onFavoriteToggle={() => toggleFavorite(meal.idMeal)}
              isFavorite={favoriteMealIds.includes(meal.idMeal)}
            />
          ))
        ) : (
          // Otherwise displaying  the random featured meal


        randomMeal && (
          <MealCard 
            mealData={randomMeal}
            isRandom={true}
            onFavoriteToggle={() => toggleFavorite(randomMeal.idMeal)}
            isFavorite={favoriteMealIds.includes(randomMeal.idMeal)}
          />
        )
      )}
      </div>
    </div>
  );
}
export default Home;