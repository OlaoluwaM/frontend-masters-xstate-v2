import './style.css';
import { createMachine, interpret } from 'xstate';

const machine = createMachine(
  {
    initial: 'loading',
    states: {
      loading: {
        on: {
          SUCCESS: 'loaded',
        },
      },

      loaded: {},
    },
  },
  {}
);

const service = interpret(machine).start();

service.subscribe(state => {
  console.log(state.value);
});

window.service = service;
