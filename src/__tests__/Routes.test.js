import React from 'react';
import { render } from '@testing-library/react';
import Routes from '../pages/Routes';
import { MemoryRouter } from 'react-router-dom'

test('it renders without crashing', () => {
  render(
      <MemoryRouter>
        <Routes />
      </MemoryRouter>
  )
});