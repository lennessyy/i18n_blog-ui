import React from 'react';
import { render } from '@testing-library/react';
import BlogForm from '../pages/BlogForm';
import { MemoryRouter } from 'react-router-dom'

test('it renders without crashing', () => {
  render(
      <MemoryRouter>
        <BlogForm />
      </MemoryRouter>
  )
});