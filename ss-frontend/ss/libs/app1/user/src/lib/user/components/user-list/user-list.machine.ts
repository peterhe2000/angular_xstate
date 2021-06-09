import { Machine } from 'xstate';

const enterIdle = () => {
  console.log('enterIdle');
};

const toggleIdle = (context, event) => {
  console.log('toggleIdle');
  console.log('context', context);
  console.log('event', event);
};

const exitIdle = () => {
  console.log('exitIdle');
};

export const userListMachine = Machine({
  id: 'userListMachine',
  initial: 'idle',
  states: {
    idle: {
      entry: enterIdle,
      on: {
        TOGGLE: {
          target: 'running',
          actions: toggleIdle,
        },
      },
      exit: exitIdle,
    },
    running: {
      on: {
        TOGGLE: 'paused',
      },
    },
    paused: {
      on: {
        TOGGLE: 'running',
        RESET: 'idle',
      },
    },
  },
});
