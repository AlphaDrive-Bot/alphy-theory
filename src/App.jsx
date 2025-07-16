import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { askOpenAI } from './openai';
import { speakText, startListening } from './speech';
import questions from './questions.json';
import './App.css';

function Scene({ question, onAnswer }) {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[6, 0.1, 6]} />
        <meshStandardMaterial color="#999" />
      </mesh>
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[1, 1, 2]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[1, 1, 2]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <Html position={[0, 1.5, 0]}>
        <div className="bg-white p-4 rounded shadow-lg text-right w-72">
          <h2 className="text-lg font-bold mb-2">{question.question}</h2>
          <ul className="space-y-2">
            {question.options.map((opt, i) => (
              <li
                key={i}
                className="cursor-pointer p-2 rounded border hover:bg-gray-100"
                onClick={() => onAnswer(i)}>
                {opt}
              </li>
            ))}
          </ul>
        </div>
      </Html>
      <OrbitControls />
    </Canvas>
  );
}

function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState({});
  const [showAgentResponse, setShowAgentResponse] = useState('');
  const current = questions[index];

  const handleAnswer = async (i) => {
    const correct = i === current.answer;
    const category = current.category;
    const newScore = { ...score };
    newScore[category] = (newScore[category] || 0) + (correct ? 1 : 0);
    setScore(newScore);

    const prompt = `המשתמש ענה על
