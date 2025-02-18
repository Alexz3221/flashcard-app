import { useState } from "react";
import { motion } from "framer-motion";

const questions = {
  goodTech: [
    "Identify a piece of technology they like and feel comfortable using.",
    "Did they like using it right away, or did the positive feelings grow over time?",
    "Was it easy to learn and start using? What made it beginner-friendly?",
    "Was it confusing at first? What made it unfriendly for beginners?",
    "Did it replace something? If so, how do they compare?",
    "Is there an element of the technology they don’t like or find confusing?",
  ],
  badTech: [
    "Identify a piece of technology they dislike and feel uncomfortable using.",
    "Did they dislike it right away, or did the negative feelings grow over time?",
    "What was the worst technology they have ever used? Why?",
  ],
  emotions: [
    "How do they feel about learning new technology? What makes it difficult or easy?",
    "What’s their preferred method of learning new technology?",
    "How do they feel about step-by-step tutorials, videos, forums, and in-person training?",
  ],
};

export default function FlashcardApp() {
  const [category, setCategory] = useState("goodTech");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % questions[category].length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="flex space-x-2 mb-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => { setCategory("goodTech"); setIndex(0); }}>Good Tech</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => { setCategory("badTech"); setIndex(0); }}>Bad Tech</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => { setCategory("emotions"); setIndex(0); }}>Emotions</button>
      </div>
      <motion.div
        className="w-96 h-60 bg-white rounded-2xl shadow-lg flex items-center justify-center text-center text-xl font-semibold cursor-pointer border"
        onClick={() => setFlipped(!flipped)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {questions[category][index]}
      </motion.div>
      <div className="mt-4 space-x-2">
        <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={nextCard}>Next</button>
      </div>
    </div>
  );
}
