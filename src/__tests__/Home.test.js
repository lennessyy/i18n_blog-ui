import React from 'react';
import { render } from '@testing-library/react';
import Home from '../pages/Home';
import { MemoryRouter } from 'react-router-dom'

test('it renders without crashing', () => {
  render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
  )
});