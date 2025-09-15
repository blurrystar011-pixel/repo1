import React from 'react'
import FoodUI from '../components/FoodUI';
import FeaturesSection from '../components/FeaturesSection';
import MexicanFoodCards from '../components/MexicanFoodCards';
import ShuffleHero from '../components/ShuffleHero';
import MexicanFoodHero from "../components/Header";
import HelloTacosInfo from '../components/HelloTacosInfo';
 const Home = () => {
  return <>
       <MexicanFoodHero />
    <FoodUI></FoodUI>
  <FeaturesSection></FeaturesSection>
  <MexicanFoodCards></MexicanFoodCards>
  <ShuffleHero></ShuffleHero>
  <HelloTacosInfo></HelloTacosInfo>
  </>
}
export default Home