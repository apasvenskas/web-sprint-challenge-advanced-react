import { fireEvent, render } from '@testing-library/react';
import AppFunctional from './AppFunctional';
import React from 'react';
import { ReactDOM } from 'react';


// Write your tests here

test('sanity', () => {
  expect(true).toBe(false)
})

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<AppFunctional />, div);
//   ReactDOM.unmountComponentAtNode(div);
// }); 
// it('renders 5 working buttons', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<AppFunctional />, div);
//   const buttons = div.querySelectorAll('keypad');
//     expect(buttons.length).toBe(5);
//     buttons.forEach(button => {
//       expect(button.disabled).toBe(false); 
//       button.click();
//     });
//     ReactDOM.unmountComponentAtNode(div);
// });
// it('checkes for an email type input', () => {
//   const emailInput = screen.getByLabelText(/email/i);
//   expect(emailInput).toHaveAttribute('type', 'email'); 
// })
// test('reset button, resets evrything to initial state', () => {
//   const { getByText } = render(<AppFunctional />);
//   const resetButton = getByText('reset');
//   fireEvent.click(resetButton);
//   expect(getByText('initialMessage')).toBeInTheDocument();
//   expect(getByText('initialEmail')).toBeInTheDocument();
//   expect(getByText('initialSteps')).toBeInTheDocument();
//   expect(getByText('initialIndex')).toBeInTheDocument();
//   expect(getByText('2')).toBeInTheDocument();
//   expect(getByText('2')).toBeInTheDocument();
//   expect(getByText('')).toBeInTheDocumen(); 
//   expect(getByText('0')).toBeInTheDocumen();
// });
// test('renders h3 with id cordinates', () => {
//   render(<AppFunctional />);
//   const h3Coordinates = screen.getById(/coordinates/i);
//   expect(h3Coordinates).toBeInTheDocument();
//   const xValue = screen.getByText(/x:/i);
//   expect(xValue).toBeInTheDocument();
//   const yValue = screen.getByText(/y:/i);
//   expect(yValue).toBeInTheDocument();
// });
