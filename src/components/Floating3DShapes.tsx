import { motion } from 'framer-motion';

const shapes = [
  { type: 'cube', size: 60, x: '10%', y: '20%', delay: 0, duration: 8 },
  { type: 'sphere', size: 80, x: '85%', y: '15%', delay: 1, duration: 10 },
  { type: 'pyramid', size: 50, x: '75%', y: '70%', delay: 0.5, duration: 9 },
  { type: 'torus', size: 70, x: '15%', y: '75%', delay: 1.5, duration: 7 },
  { type: 'cube', size: 40, x: '50%', y: '10%', delay: 2, duration: 11 },
  { type: 'sphere', size: 55, x: '90%', y: '50%', delay: 0.8, duration: 8.5 },
];

const Cube = ({ size }: { size: number }) => (
  <div
    className="preserve-3d"
    style={{
      width: size,
      height: size,
      transformStyle: 'preserve-3d',
    }}
  >
    {[...Array(6)].map((_, i) => {
      const transforms = [
        `translateZ(${size / 2}px)`,
        `rotateY(180deg) translateZ(${size / 2}px)`,
        `rotateY(90deg) translateZ(${size / 2}px)`,
        `rotateY(-90deg) translateZ(${size / 2}px)`,
        `rotateX(90deg) translateZ(${size / 2}px)`,
        `rotateX(-90deg) translateZ(${size / 2}px)`,
      ];
      return (
        <div
          key={i}
          className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 backdrop-blur-sm"
          style={{
            transform: transforms[i],
            backfaceVisibility: 'hidden',
          }}
        />
      );
    })}
  </div>
);

const Sphere = ({ size }: { size: number }) => (
  <div
    className="rounded-full bg-gradient-to-br from-primary/40 via-primary/20 to-transparent border border-primary/30 backdrop-blur-sm"
    style={{
      width: size,
      height: size,
      boxShadow: `
        inset -${size / 4}px -${size / 4}px ${size / 2}px rgba(0,0,0,0.1),
        inset ${size / 8}px ${size / 8}px ${size / 3}px rgba(255,255,255,0.2),
        0 0 ${size / 2}px hsl(var(--primary) / 0.2)
      `,
    }}
  />
);

const Pyramid = ({ size }: { size: number }) => (
  <div
    className="preserve-3d"
    style={{
      width: size,
      height: size,
      transformStyle: 'preserve-3d',
    }}
  >
    {[0, 90, 180, 270].map((rotation, i) => (
      <div
        key={i}
        className="absolute bg-gradient-to-t from-primary/30 to-transparent border border-primary/20"
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid hsl(var(--primary) / 0.2)`,
          transformOrigin: 'bottom center',
          transform: `rotateY(${rotation}deg) rotateX(30deg) translateZ(${size / 4}px)`,
        }}
      />
    ))}
    <div
      className="absolute bg-primary/10 border border-primary/20"
      style={{
        width: size,
        height: size,
        transform: `rotateX(90deg) translateZ(-${size / 2}px)`,
      }}
    />
  </div>
);

const Torus = ({ size }: { size: number }) => (
  <div
    className="rounded-full border-[8px] border-primary/30 bg-transparent"
    style={{
      width: size,
      height: size,
      boxShadow: `
        0 0 ${size / 4}px hsl(var(--primary) / 0.2),
        inset 0 0 ${size / 4}px hsl(var(--primary) / 0.1)
      `,
    }}
  />
);

const ShapeComponent = ({ type, size }: { type: string; size: number }) => {
  switch (type) {
    case 'cube':
      return <Cube size={size} />;
    case 'sphere':
      return <Sphere size={size} />;
    case 'pyramid':
      return <Pyramid size={size} />;
    case 'torus':
      return <Torus size={size} />;
    default:
      return <Sphere size={size} />;
  }
};

export default function Floating3DShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute preserve-3d"
          style={{
            left: shape.x,
            top: shape.y,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
            rotateX: [0, 360],
            rotateY: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ShapeComponent type={shape.type} size={shape.size} />
        </motion.div>
      ))}
    </div>
  );
}
