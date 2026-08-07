import { useCallback, useRef, useState } from 'react';

export function useParallax<T extends HTMLElement = HTMLDivElement>(strength = 12) {
  const ref = useRef<T>(null);
  const [transform, setTransform] = useState('');

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateY = px * strength;
      const rotateX = -py * strength;
      setTransform(
        `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`
      );
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
  }, []);

  return { ref, transform, onMouseMove, onMouseLeave };
}
