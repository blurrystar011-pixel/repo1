import React from "react";
import styled, { keyframes } from "styled-components";
import Line from '../assets/line.png';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/5.png';
import img6 from '../assets/img6.png';
import img7 from '../assets/img7.png';
import img8 from '../assets/tomato.png';
import img9 from '../assets/leaf.png';
// Floating animation for food images
const float = keyframes`
  0%, 100% { transform: translateY(0) }
  50% { transform: translateY(-15px) }
`;

const Container = styled.div`
  position: relative;
   min-height: 80vh;
  background: #fff;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem 6rem;
  font-family: "Poppins", sans-serif;
  color: #4a5568; /* gray-700 */
`;
const LineImage = styled.img`
height: 100%;
  position: absolute;
  width: 100%;
  max-width: 900px;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  user-select: none;
  z-index: 0;
  opacity: 1;
`;

const Title = styled.h1`
  color: #e56363;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  max-width: 420px;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
  color: #4a5568;
  margin-bottom: 4rem;
`;

const FloatingImage = styled.img`
  position: absolute;
  width: ${(props) => props.width || "120px"};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  animation: ${float} 4s ease-in-out infinite;
  pointer-events: none;
  user-select: none;
  object-fit: contain;
  z-index: 0;

  /* Tablet: 769px to 1024px */
  @media (max-width: 1024px) and (min-width: 769px) {
    width: ${(props) => props.tabletWidth || props.width || "150px"};
    top: ${(props) => props.tabletTop || props.top};
    left: ${(props) => props.tabletLeft || props.left};
    right: ${(props) => props.tabletRight || props.right};
  }

  /* Mobile: 768px and below */
  @media (max-width: 768px) {
    width: ${(props) => props.mobileWidth || props.width || "100px"};
    top: ${(props) => props.mobileTop || props.top};
    left: ${(props) => props.mobileLeft || props.left};
    right: ${(props) => props.mobileRight || props.right};
  }
`;



const StatsBar = styled.div`
  position: fixed;
  bottom: 40px;
  background: #fff;
  box-shadow: 0 10px 20px rgb(0 0 0 / 0.1);
  border-radius: 18px;
  padding: 0.8rem 1.5rem;
  display: inline-flex;
  gap: 2rem;
  align-items: center;
  font-weight: 600;
  font-size: 1rem;
  color: #4a5568;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;

  & > .number {
    font-weight: 800;
    font-size: 1.2rem;
  }
`;

const TextGroup = styled.div`
  display: flex;
  gap: 6px;
  align-items: baseline;
`;

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  svg {
    width: 100%;
    height: 100%;
    stroke: #e56363;
  }
`;

// SVG icons
const RestaurantIcon = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 9l9-6 9 6v11a1 1 0 0 1-1 1h-6v-6H10v6H4a1 1 0 0 1-1-1z" />
  </svg>
);

const LocationIcon = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 21c-4-5-7-9-7-12a7 7 0 1 1 14 0c0 3-3 7-7 12z" />
    <circle cx="12" cy="9" r="2" />
  </svg>
);

const OrdersIcon = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 21h16v-2H4v2zM4 7h16v10H4V7zM16 7V5a4 4 0 0 0-8 0v2" />
  </svg>
);

export default function FoodUI() {
  return (
    <Container>
          <LineImage src={Line} alt="Decorative line" />
      {/* Replace the URLs below with your own valid images if you want */}
      <FloatingImage
        src={img1}
        alt="Burger"
        top="10%"
        left="10%"
          width="250px"
          mobileTop= "15%"
          mobileLeft="5%" 
  tabletWidth="180px"   // width on tablets (769px-1024px)
  mobileWidth="150px"   // width on mobiles (<=768px)
      />
      <FloatingImage
        src={img2}
        right="5%"
        mobileTop= "5%"
          width="250px"
  tabletWidth="180px"   // width on tablets (769px-1024px)
  mobileWidth="150px"   // width on mobiles (<=768px)
      />
      <FloatingImage
        src={img3}
        top="60%"
        right="40%"
         width="250px"
         mobileTop= "65%"
         mobileRight="10%" 
  tabletWidth="180px"   // width on tablets (769px-1024px)
  mobileWidth="150px"   // width on mobiles (<=768px)
      />
      <FloatingImage
        src={img6}
        top="70%"
        left="15%"
          width="250px"
           mobileTop= "65%"
          mobileLeft="5%" 
  tabletWidth="180px"   // width on tablets (769px-1024px)
  mobileWidth="150px"   // width on mobiles (<=768px)
        style={{ animationDuration: "6s" }}
      />
      <FloatingImage
        src={img8}
        top="15%"
        right="50%"
         mobileTop= "5%"
        width="100px"
        style={{ animationDuration: "5s" }}
      />
          <FloatingImage
        src={img9}
        top="20%"
        right="15%"
        width="100px"
        style={{ animationDuration: "5s" }}
      />
          <FloatingImage
        src={img8}
        top="70%"
        left="5%"
          mobileLeft="40%"
        width="100px"
        style={{ animationDuration: "5s" }}
      />

      <Title>
        Better food for <br />
        more people
      </Title>
      <Subtitle>
        For over a decade, we’ve enabled our customers to discover new tastes,
        delivered right to their doorstep
      </Subtitle>

      <StatsBar>
        <StatItem>
          <TextGroup>
            <span className="number">3+</span> restaurants
          </TextGroup>
          <IconWrapper>
            <RestaurantIcon />
          </IconWrapper>
        </StatItem>
        <StatItem>
          <TextGroup>
            <span className="number">10+</span> cities
          </TextGroup>
          <IconWrapper>
            <LocationIcon />
          </IconWrapper>
        </StatItem>
        <StatItem>
          <TextGroup>
            <span className="number">1k+</span> orders delivered
          </TextGroup>
          <IconWrapper>
            <OrdersIcon />
          </IconWrapper>
        </StatItem>
      </StatsBar>
    </Container>
  );
}
