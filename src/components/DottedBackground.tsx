import React, { useEffect, useRef } from 'react';

const DottedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get device pixel ratio for crisp rendering on high-DPI displays
    const devicePixelRatio = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      
      // Set actual size in memory (scaled to account for extra pixel density)
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      
      // Scale the drawing context so everything draws at the correct size
      ctx.scale(devicePixelRatio, devicePixelRatio);
      
      // Set display size (CSS pixels)
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced parameters for 4K quality
    const dotSpacing = 35; // Slightly tighter spacing for more detail
    const dotRadius = 1.8; // Slightly smaller base radius for precision
    const hoverRadius = 140; // Larger interaction area
    const rippleRadius = 220; // Extended ripple effect

    // Listen to mouse events on the entire document instead of just the canvas
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1;
      mouseRef.current.y = -1;
    };

    // Add event listeners to document instead of canvas
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      timeRef.current += 0.015; // Slightly slower for smoother animation
      
      // Clear with anti-aliasing
      ctx.clearRect(0, 0, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio);
      
      // Enable high-quality rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const cols = Math.ceil((canvas.width / devicePixelRatio) / dotSpacing);
      const rows = Math.ceil((canvas.height / devicePixelRatio) / dotSpacing);

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

          // Base dot properties with higher precision
          let opacity = 0.28;
          let radius = dotRadius;
          let red = 156, green = 163, blue = 175; // Base gray-400 color

          // Primary hover effect with enhanced smoothness
          if (distance < hoverRadius) {
            const factor = 1 - (distance / hoverRadius);
            const easedFactor = 1 - Math.pow(1 - factor, 3); // Cubic ease-out
            
            // Enhanced size scaling with refined pulsing effect
            const pulse = Math.sin(timeRef.current * 2.5 + factor * 8) * 0.25 + 1;
            radius = dotRadius + (easedFactor * 3.5 * pulse);
            
            // Smoother color transition to blue/cyan
            red = Math.floor(156 - (easedFactor * 90));
            green = Math.floor(163 + (easedFactor * 40));
            blue = Math.floor(175 + (easedFactor * 70));
            
            // Enhanced opacity with smoother transitions
            opacity = 0.28 + (easedFactor * 0.75);
          }

          // Secondary ripple effect with refined waves
          if (distance >= hoverRadius && distance < rippleRadius) {
            const rippleFactor = 1 - ((distance - hoverRadius) / (rippleRadius - hoverRadius));
            const wave = Math.sin(timeRef.current * 1.8 - distance * 0.015) * 0.5 + 0.5;
            
            opacity = 0.28 + (rippleFactor * wave * 0.35);
            radius = dotRadius + (rippleFactor * wave * 1.8);
            
            // Subtle color shift in ripple
            blue = Math.floor(175 + (rippleFactor * wave * 25));
          }

          // Draw the main dot with anti-aliasing
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
          ctx.fill();

          // Enhanced glow effect for hovered dots
          if (distance < hoverRadius) {
            const factor = 1 - (distance / hoverRadius);
            const glowRadius = radius + 10;
            const glowOpacity = factor * 0.18;
            
            // Create multiple glow layers for depth
            const gradient = ctx.createRadialGradient(x, y, radius * 0.5, x, y, glowRadius);
            gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, ${glowOpacity * 0.8})`);
            gradient.addColorStop(0.5, `rgba(${red}, ${green}, ${blue}, ${glowOpacity * 0.4})`);
            gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);
            
            ctx.beginPath();
            ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Inner highlight for extra shine
            if (factor > 0.7) {
              const highlightOpacity = (factor - 0.7) * 0.3;
              ctx.beginPath();
              ctx.arc(x - radius * 0.3, y - radius * 0.3, radius * 0.4, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${highlightOpacity})`;
              ctx.fill();
            }
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default DottedBackground;