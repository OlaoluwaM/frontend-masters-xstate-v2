import '../style.css';

// Create a state machine transition function either using:
// - a switch statement (or nested switch statements)
// - or an object (transition lookup table)

// Also, come up with a simple way to "interpret" it, and
// make it an object that you can `.send(...)` events to.

const machine = {
  initial: 'loading',

  states: {
    loading: {
      on: {
        LOADED: 'playing',
      },
    },

    playing: {
      on: {
        PAUSE: 'paused',
      },
    },

    paused: {
      on: {
        PLAY: 'playing',
      },
    },
  },
};

function send(machineConfig) {
  let currentState = machineConfig.initial;

  return event => {
    const sentEvent = event?.type ?? event;

    const nextState =
      machineConfig.states[currentState].on[sentEvent] ?? currentState;

    logOnTransition(currentState, nextState, sentEvent);
    currentState = nextState;
  };
}

function logOnTransition(currentState, nextState, sentEvent) {
  if (nextState === currentState) {
    console.log(
      `Seems like there is no ${sentEvent} event for the ${currentState} state`
    );
  } else {
    console.log(
      `Transitioning to the ${nextState} state from the ${currentState} state`
    );
  }

  console.log({ status: nextState });
}

window.send = send(machine);
