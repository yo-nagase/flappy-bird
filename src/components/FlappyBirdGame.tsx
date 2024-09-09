"use client";

import React, { useEffect, useRef, useState } from 'react';
import GameEngine from '../classes/GameEngine';

const FlappyBirdGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  const [isWaiting, setIsWaiting] = useState(true);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 800;
      canvas.height = 600;
      const newGameEngine = new GameEngine(canvas);
      setGameEngine(newGameEngine);
    }
  }, []);

  useEffect(() => {
    if (gameEngine) {
      const intervalId = setInterval(() => {
        setScore(gameEngine.getScore());
        setGameOver(gameEngine.isGameOver());
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, [gameEngine]);

  const handleStart = () => {
    if (gameEngine && (isWaiting || gameOver)) {
      gameEngine.start();
      setIsWaiting(false);
      setGameOver(false);
    }
  };

  const handleClick = () => {
    if (!isWaiting && !gameOver) {
      gameEngine?.onScreenClick();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          style={{ border: '1px solid black', width: '800px', height: '600px' }}
        />
        {(isWaiting || gameOver) && (
          <button
            onClick={handleStart}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '24px',
              padding: '10px 20px',
            }}
          >
            {isWaiting ? 'Start Game' : 'Restart Game'}
          </button>
        )}
      </div>
      <div style={{ marginTop: '20px', fontSize: '24px' }}>
        Score: {score}
      </div>
    </div>
  );
};

export default FlappyBirdGame;