import AppFunctional from './AppFunctional';
import React from 'react';
import { ReactDOM } from 'react';


// Write your tests here

test('sanity', () => {
  expect(true).toBe(false)
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppFunctional />, div);
  ReactDOM.unmountComponentAtNode(div);
}); 
it('renders 5 working buttons', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppFunctional />, div);
  const buttons = div.querySelectorAll('keypad');
    expect(buttons.length).toBe(5);
    buttons.forEach(button => {
      expect(button.disabled).toBe(false); 
      button.click();
    });
    ReactDOM.unmountComponentAtNode(div);
});