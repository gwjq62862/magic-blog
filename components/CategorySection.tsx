import React from "react";
import { Star, Eye, User, Rocket } from "lucide-react";

import Card from "./Card";
const cardsData = [
  {
    title: "Mind Tricks",
    description: "Learn classic and modern techniques to amaze.",
    icon: Star,
    color: "purple",
  },
  {
    title: "Illusion Science",
    description: "The science behind how illusions fool our senses.",
    icon: Eye,
    color: "blue",
  },
  {
    title: "Psychology Breakdown",
    description: "Understand the 'why' behind human behavior.",
    icon: User,
    color: "purple",
  },
  {
    title: "Brain Boost Techniques",
    description: "Tips and methods to enhance cognitive function.",
    icon: Rocket,
    color: "blue",
  },
];
const CategorySection = () => {
  return (
    <>
      <div className="w-full max-w-5xl mx-auto mt-16 md:mt-24">
        <h2 className="text-white text-3xl font-bold tracking-tight text-center">
          Explore Our Categories
        </h2>
      </div>
      <section className="w-full max-w-5xl mx-auto py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {cardsData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          icon={card.icon}
          color={card.color}
        />
      ))}
        </div>
      </section>
    </>
  );
};

export default CategorySection;
