import React, { useEffect, useRef } from 'react';

const DottedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const dotSpacing = 40;
    const dotRadius = 2;
    const hoverRadius = 80;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1;
      mouseRef.current.y = -1;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / dotSpacing);
      const rows = Math.ceil(canvas.height / dotSpacing);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * dotSpacing;
          const y = j * dotSpacing;

          // Calculate distance from mouse
          const mouseX = mouseRef.current.x;
          const mouseY = mouseRef.current.y;
          const distance = mouseX >= 0 && mouseY >= 0 
            ? Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2)
            : Infinity;

          // Determine dot color and size based on hover
          let opacity = 0.3;
          let radius = dotRadius;

          if (distance < hoverRadius) {
            const factor = 1 - (distance / hoverRadius);
            opacity = 0.3 + (factor * 0.5); // Brighten on hover
            radius = dotRadius + (factor * 1); // Slightly larger on hover
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(156, 163, 175, ${opacity})`; // Gray-400 with varying opacity
          ctx.fill();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};

export default DottedBackground;