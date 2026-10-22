import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface AnimatedRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export const AnimatedReveal: React.FC<AnimatedRevealProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  yOffset = 28,
  direction = 'up',
  className = '',
  ...props
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: yOffset, x: 0 };
      case 'down':
        return { opacity: 0, y: -yOffset, x: 0 };
      case 'left':
        return { opacity: 0, x: yOffset, y: 0 };
      case 'right':
        return { opacity: 0, x: -yOffset, y: 0 };
      case 'none':
      default:
        return { opacity: 0, x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 0.1, className = '' }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollRevealText: React.FC<{
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
}> = ({ text, className = '', tag = 'p', delay = 0 }) => {
  const words = text.split(' ');
  const TagComponent = motion[tag] as any;

  return (
    <TagComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.04,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={{
            hidden: { opacity: 0, y: 12, filter: 'blur(3px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          className="inline-block mr-[0.28em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </TagComponent>
  );
};

export const PatternDivider: React.FC<{
  className?: string;
  label?: string;
}> = ({ className = '', label }) => {
  return (
    <div className={`relative flex items-center justify-center my-10 ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-neutral-200/80"></div>
      </div>
      <div className="relative bg-[#FAFAFA] px-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-amber-500 rotate-45 inline-block"></span>
        {label && (
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-medium">
            {label}
          </span>
        )}
        <span className="w-1.5 h-1.5 bg-amber-500 rotate-45 inline-block"></span>
      </div>
    </div>
  );
};
