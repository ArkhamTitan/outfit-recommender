function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getOutfit(temp, condition) {
  const cold = {
    tops: ["Heavy Jacket", "Parka", "Wool Coat"],
    bottoms: ["Thermal Pants", "Sweatpants", "Lined Jeans"],
    shoes: ["Snow Boots", "Winter Boots"]
  };

  const medium = {
    tops: ["Hoodie", "Long Sleeve Shirt", "Light Jacket"],
    bottoms: ["Jeans", "Chinos", "Cargo Pants"],
    shoes: ["Sneakers", "High Tops"]
  };

  const hot = {
    tops: ["T-shirt", "Tank Top", "Athletic Shirt"],
    bottoms: ["Shorts", "Gym Shorts"],
    shoes: ["Slides", "Sandals", "Low-top Sneakers"]
  };

  let outfitCategory;

  if (temp < 40) {
    outfitCategory = cold;
  } else if (temp < 70) {
    outfitCategory = medium;
  } else {
    outfitCategory = hot;
  }

  let shoes = getRandomItem(outfitCategory.shoes);

  // Weather-based modifier
  if (condition.includes("rain")) {
    shoes = "Waterproof Boots";
  }

  // Return random articles of clothing in category
  return {
    top: getRandomItem(outfitCategory.tops),
    bottom: getRandomItem(outfitCategory.bottoms),
    shoes
  };
}

module.exports = { getOutfit };
