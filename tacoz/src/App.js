import logo from './logo.svg';
import './App.css';
import MexicanFoodHero from './components/Header';
import FoodUI from './components/FoodUI';
import FeaturesSection from './components/FeaturesSection';
import MexicanFoodCards from './components/MexicanFoodCards';
import ShuffleHero from './components/ShuffleHero';

function App() {
  return <>
  <MexicanFoodHero></MexicanFoodHero>
  <FoodUI></FoodUI>
  <FeaturesSection></FeaturesSection>
  <MexicanFoodCards></MexicanFoodCards>
  <ShuffleHero></ShuffleHero>
  
  </>
}

export default App;
