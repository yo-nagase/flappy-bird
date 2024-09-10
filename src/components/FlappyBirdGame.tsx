"use client";

import React, { useEffect, useRef, useState } from 'react';
import GameEngine from '../classes/GameEngine';

const FlappyBirdGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameEngineRef = useRef<GameEngine | null>(null);
  const [isWaiting, setIsWaiting] = useState(true);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 900;
      canvas.height = 600;
      gameEngineRef.current = new GameEngine(canvas);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        gameEngineRef.current?.onScreenClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (gameEngineRef.current) {
      const intervalId = setInterval(() => {
        setScore(gameEngineRef.current!.getScore());
        setGameOver(gameEngineRef.current!.isGameOver());
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, []);

  const handleStart = () => {
    if (gameEngineRef.current && (isWaiting || gameOver)) {
      gameEngineRef.current.start();
      setIsWaiting(false);
      setGameOver(false);
    }
  };

  const handleClick = () => {
    if (!isWaiting && !gameOver) {
      gameEngineRef.current?.onScreenClick();
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
              top: '90%',
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