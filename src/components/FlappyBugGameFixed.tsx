import React, { useRef, useEffect, useState, useCallback } from 'react';

interface Pipe {
  x: number;
  topHeight: number;
  bottomY: number;
  passed: boolean;
}

interface Bug {
  x: number;
  y: number;
  velocity: number;
}

const FlappyBugGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const backgroundAnimationRef = useRef<number>();
  const gameStateRef = useRef({ gameStarted: false, gameOver: false });
  const gridOffsetRef = useRef({ x: 0, y: 0 });
  
  // Game constants
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 600;
  const BUG_SIZE = 30;
  const PIPE_WIDTH = 60;
  const BASE_PIPE_GAP = 180;
  const BASE_GRAVITY = 0.4;
  const JUMP_STRENGTH = -9;
  const BASE_PIPE_SPEED = -2;
  
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bug, setBug] = useState<Bug>({
    x: 80,
    y: CANVAS_HEIGHT / 2,
    velocity: 0
  });
  const [pipes, setPipes] = useState<Pipe[]>([]);
  
  // Dynamic difficulty based on score
  const getDifficulty = useCallback(() => {
    const speedMultiplier = 1 + (score * 0.05); // Speed increases by 5% per point
    const gapReduction = Math.min(score * 3, 50); // Gap reduces by 3px per point, max 50px
    
    return {
      pipeSpeed: BASE_PIPE_SPEED * speedMultiplier,
      gravity: BASE_GRAVITY + (score * 0.01), // Gravity increases slightly
      pipeGap: Math.max(BASE_PIPE_GAP - gapReduction, 120) // Minimum gap of 120px
    };
  }, [score]);
  
  // Create a new pipe
  const createPipe = useCallback((): Pipe => {
    const difficulty = getDifficulty();
    const minHeight = 80;
    const maxHeight = CANVAS_HEIGHT - difficulty.pipeGap - 80;
    const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
    
    return {
      x: CANVAS_WIDTH,
      topHeight,
      bottomY: topHeight + difficulty.pipeGap,
      passed: false
    };
  }, [getDifficulty]);
  
  // Reset game state
  const resetGame = useCallback(() => {
    setBug({
      x: 80,
      y: CANVAS_HEIGHT / 2,
      velocity: 0
    });
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    gameStateRef.current = { gameStarted: false, gameOver: false };
  }, []);
  
  // Handle jump
  const jump = useCallback(() => {
    console.log('Jump - Current state:', { gameStarted: gameStateRef.current.gameStarted, gameOver: gameStateRef.current.gameOver });
    
    if (!gameStateRef.current.gameStarted) {
      console.log('Starting game!');
      setGameStarted(true);
      gameStateRef.current.gameStarted = true;
      // Add first pipe when game starts
      const difficulty = getDifficulty();
      const minHeight = 80;
      const maxHeight = CANVAS_HEIGHT - difficulty.pipeGap - 80;
      const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
      
      const firstPipe = {
        x: CANVAS_WIDTH,
        topHeight,
        bottomY: topHeight + difficulty.pipeGap,
        passed: false
      };
      console.log('Adding first pipe:', firstPipe);
      setPipes([firstPipe]);
    }
    if (!gameStateRef.current.gameOver) {
      console.log('Bug jumping!');
      setBug(prev => ({ ...prev, velocity: JUMP_STRENGTH }));
    } else {
      console.log('Restarting game!');
      setBug({
        x: 80,
        y: CANVAS_HEIGHT / 2,
        velocity: 0
      });
      setPipes([]);
      setScore(0);
      setGameOver(false);
      setGameStarted(false);
      gameStateRef.current = { gameStarted: false, gameOver: false };
    }
  }, [getDifficulty]);
  
  // Draw bug
  const drawBug = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Bug body (golden circle)
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(x + BUG_SIZE/2, y + BUG_SIZE/2, BUG_SIZE/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Bug outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Eyes
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x + BUG_SIZE/3, y + BUG_SIZE/3, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 2*BUG_SIZE/3, y + BUG_SIZE/3, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Pupils
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x + BUG_SIZE/3, y + BUG_SIZE/3, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 2*BUG_SIZE/3, y + BUG_SIZE/3, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Antennae
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x + 5, y - 10);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + BUG_SIZE - 10, y);
    ctx.lineTo(x + BUG_SIZE - 5, y - 10);
    ctx.stroke();
  };
  
  // Draw pipe
  const drawPipe = (ctx: CanvasRenderingContext2D, pipe: Pipe) => {
    // Pipe color with gradient for futuristic look
    const gradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + PIPE_WIDTH, 0);
    gradient.addColorStop(0, '#00FF88');
    gradient.addColorStop(1, '#00CC66');
    ctx.fillStyle = gradient;
    
    // Top pipe
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
    
    // Bottom pipe
    ctx.fillRect(pipe.x, pipe.bottomY, PIPE_WIDTH, CANVAS_HEIGHT - pipe.bottomY);
    
    // Pipe borders for futuristic effect
    ctx.strokeStyle = '#00FFAA';
    ctx.lineWidth = 2;
    ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
    ctx.strokeRect(pipe.x, pipe.bottomY, PIPE_WIDTH, CANVAS_HEIGHT - pipe.bottomY);
  };
  
  // Check collision
  const checkCollision = useCallback((bugObj: Bug, pipe: Pipe): boolean => {
    const bugLeft = bugObj.x;
    const bugRight = bugObj.x + BUG_SIZE;
    const bugTop = bugObj.y;
    const bugBottom = bugObj.y + BUG_SIZE;
    
    const pipeLeft = pipe.x;
    const pipeRight = pipe.x + PIPE_WIDTH;
    
    // Check if bug is within pipe's x range with some tolerance
    if (bugRight > pipeLeft + 5 && bugLeft < pipeRight - 5) {
      // Check collision with top or bottom pipe with some tolerance
      if (bugTop < pipe.topHeight - 5 || bugBottom > pipe.bottomY + 5) {
        return true;
      }
    }
    
    return false;
  }, []);
  
  // Game update logic with timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const gameLoop = setInterval(() => {
      const difficulty = getDifficulty();
      
      // Update bug physics
      setBug(prev => {
        const newBug = {
          ...prev,
          velocity: prev.velocity + difficulty.gravity,
          y: prev.y + prev.velocity
        };
        console.log('Bug update:', { y: newBug.y, velocity: newBug.velocity });
        return newBug;
      });
      
      // Update pipes
      setPipes(prevPipes => {
        const newPipes = prevPipes.map(pipe => ({
          ...pipe,
          x: pipe.x + difficulty.pipeSpeed
        })).filter(pipe => pipe.x + PIPE_WIDTH > 0);
        
        console.log('Pipes update:', newPipes.length, newPipes.map(p => ({ x: p.x, topHeight: p.topHeight })));
        
        // Check for scoring
        newPipes.forEach(pipe => {
          if (!pipe.passed && pipe.x + PIPE_WIDTH < 80) {
            pipe.passed = true;
            setScore(prev => prev + 1);
          }
        });
        
        // Add new pipe if needed
        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < CANVAS_WIDTH - 250) {
          const minHeight = 80;
          const maxHeight = CANVAS_HEIGHT - difficulty.pipeGap - 80;
          const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
          
          const newPipe = {
            x: CANVAS_WIDTH,
            topHeight,
            bottomY: topHeight + difficulty.pipeGap,
            passed: false
          };
          console.log('Adding new pipe:', newPipe);
          newPipes.push(newPipe);
        }
        
        return newPipes;
      });
    }, 16); // ~60 FPS
    
    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, getDifficulty]);
  
  // Collision detection with timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const collisionCheck = setInterval(() => {
      // Check collisions
      const collision = pipes.some(pipe => checkCollision(bug, pipe));
      if (collision || bug.y <= 0 || bug.y >= CANVAS_HEIGHT - BUG_SIZE) {
        setGameOver(true);
        gameStateRef.current.gameOver = true;
      }
    }, 16);
    
    return () => clearInterval(collisionCheck);
  }, [gameStarted, gameOver, bug, pipes, checkCollision]);
  
  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const render = () => {
      // Clear canvas with dark background
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      // Add subtle grid pattern for futuristic look
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 1;
      for (let i = 0; i < CANVAS_WIDTH; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, CANVAS_HEIGHT);
        ctx.stroke();
      }
      for (let i = 0; i < CANVAS_HEIGHT; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(CANVAS_WIDTH, i);
        ctx.stroke();
      }
      
      // Draw pipes
      pipes.forEach(pipe => {
        drawPipe(ctx, pipe);
      });
      
      // Draw bug
      drawBug(ctx, bug.x, bug.y);
      
      // Draw score and difficulty info
      ctx.fillStyle = '#00FFAA';
      ctx.font = 'bold 32px Space Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(score.toString(), CANVAS_WIDTH / 2, 50);
      
      // Show difficulty level
      if (gameStarted && !gameOver && score > 0) {
        ctx.fillStyle = '#FFD700';
        ctx.font = '12px Space Mono, monospace';
        ctx.fillText(`Speed: ${(1 + score * 0.05).toFixed(1)}x`, CANVAS_WIDTH / 2, 75);
      }
      
      // Draw game over or start message
      if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        ctx.fillStyle = '#FF4444';
        ctx.font = 'bold 24px Space Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
        
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 18px Space Mono, monospace';
        ctx.fillText(`Final Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
        
        ctx.fillStyle = '#00FFAA';
        ctx.font = '16px Space Mono, monospace';
        ctx.fillText('Click or Press SPACE to restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
      } else if (!gameStarted) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        ctx.fillStyle = '#00FFAA';
        ctx.font = 'bold 20px Space Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('FLAPPY BUG', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);
        
        ctx.font = '14px Space Mono, monospace';
        ctx.fillText('Click or Press SPACE to start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        
        ctx.fillStyle = '#FFD700';
        ctx.font = '12px Space Mono, monospace';
        ctx.fillText('Difficulty increases with score!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 25);
      }
      
      animationRef.current = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [bug, pipes, score, gameStarted, gameOver]);
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        jump();
      }
    };
    
    const handleClick = () => {
      jump();
    };
    
    const canvas = canvasRef.current;
    
    window.addEventListener('keydown', handleKeyPress);
    if (canvas) {
      canvas.addEventListener('click', handleClick);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (canvas) {
        canvas.removeEventListener('click', handleClick);
      }
    };
  }, [jump]);
  
  // Sync state with refs
  useEffect(() => {
    gameStateRef.current.gameStarted = gameStarted;
    gameStateRef.current.gameOver = gameOver;
  }, [gameStarted, gameOver]);
  
  // Background grid animation
  useEffect(() => {
    const backgroundCanvas = backgroundCanvasRef.current;
    if (!backgroundCanvas) return;
    
    const ctx = backgroundCanvas.getContext('2d');
    if (!ctx) return;
    
    const GRID_SIZE = 30;
    const GRID_SPEED = 0.5;
    
    const drawGrid = () => {
      // Clear canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      // Set up glow effect
      ctx.strokeStyle = 'hsl(var(--accent))';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;
      ctx.shadowColor = 'hsl(var(--accent))';
      ctx.shadowBlur = 8;
      
      // Update grid offset for animation
      gridOffsetRef.current.x = (gridOffsetRef.current.x + GRID_SPEED) % GRID_SIZE;
      gridOffsetRef.current.y = (gridOffsetRef.current.y + GRID_SPEED * 0.7) % GRID_SIZE;
      
      // Draw vertical lines
      for (let x = -GRID_SIZE + gridOffsetRef.current.x; x <= CANVAS_WIDTH + GRID_SIZE; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
      }
      
      // Draw horizontal lines
      for (let y = -GRID_SIZE + gridOffsetRef.current.y; y <= CANVAS_HEIGHT + GRID_SIZE; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_WIDTH, y);
        ctx.stroke();
      }
      
      // Reset shadow for next frame
      ctx.shadowBlur = 0;
      
      backgroundAnimationRef.current = requestAnimationFrame(drawGrid);
    };
    
    drawGrid();
    
    return () => {
      if (backgroundAnimationRef.current) {
        cancelAnimationFrame(backgroundAnimationRef.current);
      }
    };
  }, []);
  
  // Initialize game
  useEffect(() => {
    resetGame();
  }, [resetGame]);
  
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center">
        <h2 className="text-heading-xl mb-4">Play a Game? 🐞</h2>
        <p className="text-body text-text-secondary max-w-md">
          Help the bug navigate through the pipes! Click or press SPACE to jump.
        </p>
      </div>
      
      <div className="relative">
        {/* Background Grid Canvas */}
        <canvas
          ref={backgroundCanvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
            zIndex: 1
          }}
        />
        
        {/* Main Game Canvas */}
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="relative border-2 border-accent/30 rounded-lg cursor-pointer hover:border-accent/50 transition-colors shadow-xl"
          style={{ 
            background: 'transparent',
            boxShadow: '0 0 30px rgba(0, 255, 170, 0.2)',
            zIndex: 2
          }}
        />
      </div>
      
      <div className="text-center text-text-tertiary text-sm max-w-md">
        <p>🎮 Use SPACEBAR or click to jump</p>
        <p>🎯 Avoid the pipes and score points</p>
        <p>🔄 Game resets automatically on collision</p>
      </div>
    </div>
  );
};

export default FlappyBugGame;
