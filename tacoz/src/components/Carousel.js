import React from "react";
import "./Carousel.css";

const carouselItems = [
  {
    img: "https://www.mexicanplease.com/wp-content/uploads/2018/01/best-chicken-tacos-closeup.jpg",
    title: "Tacos Fiesta",
    desc: "Try our authentic Mexican tacos in London",
  },
  {
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    title: "Burrito Heaven",
    desc: "Delicious burritos made fresh daily",
  },
  {
    img: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop",
    title: "Cheesy Quesadillas",
    desc: "Melted cheese perfection in every bite",
  },
  {
    img: "https://c8.alamy.com/comp/G12FJG/tortilla-chips-served-with-guacamole-salsa-and-pico-de-gallo-view-G12FJG.jpg",
    title: "Nachos Supreme",
    desc: "Loaded nachos with all your favourite toppings",
  },
  {
    img: "https://i.ytimg.com/vi/tHVzFLtvbGQ/maxresdefault.jpg",
    title: "Fresh Guacamole",
    desc: "Handmade guacamole using ripe avocados",
  },
  {
    img: "https://th.bing.com/th/id/OIP.ihb_XsaRblH0xdLJ8zzicAHaHa?w=201&h=201&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3",
    title: "Enchiladas Special",
    desc: "Savory enchiladas with rich Mexican sauces",
  },
  {
    img: "https://tse3.mm.bing.net/th/id/OIP.n_Vv4fE_XNa_Z2pc3dvrFgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Spicy Soups",
    desc: "Warm up with our traditional Mexican soups",
  },
  {
    img: "https://th.bing.com/th/id/OIP.NbWYW2pF54imTUaUbqNMywHaEK?w=314&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3",
    title: "Churros Delight",
    desc: "Sweet churros with chocolate dipping sauce",
  },
  {
    img: "https://tse1.mm.bing.net/th/id/OIP.y45us9hoo50X0NK4KooCVgHaHa?pid=ImgDet&w=202&h=202&c=7&dpr=2&o=7&rm=3",
    title: "Margaritas",
    desc: "Classic margaritas to complement your meal",
  },
];


const Carousel = () => {
  return (
    <div className="wrapper">
      <div className="carousel">
        {carouselItems.map((item, index) => (
          <div className="carousel__item" key={index}>
            <div className="carousel__item-head">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="carousel__item-body">
              <p className="carousel__title">{item.title}</p>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
