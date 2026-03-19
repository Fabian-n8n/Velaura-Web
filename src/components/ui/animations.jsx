import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

/* BlurIn — fires on mount (use for Hero elements only) */
export function BlurIn({ children, delay = 0, duration = 0.6, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* FadeUp — scroll-triggered, fires once on enter */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  as = 'div',
}) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </Tag>
  );
}

/* SplitText — scroll-triggered word-by-word stagger */
export function SplitText({
  text,
  baseDelay = 0,
  wordDelay = 0.07,
  duration = 0.55,
  className = '',
}) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          style={{ display: 'inline-block', marginRight: '0.27em' }}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration, delay: baseDelay + i * wordDelay, ease }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* StaggerChildren — wraps a container, children fade in sequence */
export function StaggerParent({ children, className = '', stagger = 0.1 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChild({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden:  { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}
