import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

const Star = styled.span`
  position: absolute;
  background: #fff;
  border-radius: 50%;
  opacity: ${(p) => p.$opacity ?? 0.5};
  animation: twinkle ${(p) => (p.$duration ?? 3) + "s"} ease-in-out infinite;
  @keyframes twinkle {
    0%,
    100% {
      opacity: ${(p) => p.$opacity ?? 0.5};
    }
    50% {
      opacity: ${(p) => (p.$opacity ?? 0.5) * 0.4};
    }
  }
`;

function Starfield({ count = 60 }) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 2 + 2,
    });
  }
  return (
    <Container>
      {stars.map((s) => (
        <Star
          key={s.id}
          $opacity={s.opacity}
          $duration={s.duration}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
          }}
        />
      ))}
    </Container>
  );
}

export default Starfield;
