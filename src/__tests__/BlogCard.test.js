import React from 'react';
import { render } from '@testing-library/react';
import BlogCard from '../pages/BlogCard';
import { MemoryRouter } from 'react-router-dom'

test('it renders without crashing', () => {
  render(
      <MemoryRouter>
        <BlogCard />
      </MemoryRouter>
  )
});