import type { ContactBackground } from '../../content/homeContent';
import { useImageRotator } from '../../hooks/useImageRotator';

/* W3-HP10 / W3-G1: the shared low-opacity rotating background used by the closing contact sections.
   The section it sits in needs `has-section-backdrop` for the stacking context. Decorative only, so
   it is hidden from assistive technology and carries no controls.

   Each image may carry its own `frame` and `focus`, because the backdrop is masked to its left side
   and a centred subject otherwise falls outside the visible area. */
export function RotatingBackdrop({ images, intervalMs = 6000 }: { images: readonly ContactBackground[]; intervalMs?: number }) {
  const { active } = useImageRotator(images.length, intervalMs);

  return (
    <div className="section-backdrop" aria-hidden="true">
      {images.map((image, index) => (
        <span
          key={image.src}
          data-active={index === active}
          style={{
            backgroundImage: `url(${image.src})`,
            backgroundSize: image.frame,
            backgroundPosition: image.focus,
          }}
        />
      ))}
    </div>
  );
}
