import React from "react";

function AnimalCard({ animalType }) {
  return (
    <div>
      <img src={`images/${animalType}.png`} alt="AnimalCard" />
    </div>
  );
}

export default AnimalCard;
