export const bouncingTransition = {
  type: 'spring',
  stiffness: 700,
  damping: 15,
  duration: 0.5,
};

export const slidingLeft = {
  initial: {
    x: -300,
  },
  animate: {
    x: 0,
  },
};
export const slidingRight = {
  initial: {
    x: 300,
  },
  animate: {
    x: 0,
  },
};

export const bouncingAnswer = {
  initial: {
    y: -100,
  },
  show: {
    y: 0,
  },
};

export const boucingQuestion = {
  initial: {
    y: 100,
  },
  show: {
    y: 0,
  },
};
