import React from 'react';
import { render } from '@testing-library/react';

import Search from './index';

describe('Search', () => {
  it('renders', () => {
    const { getByLabelText } = render(<Search />);

    expect(getByLabelText('search documents')).toBeInTheDocument();
  });

  it('has correct placeholder', () => {
    const { getByPlaceholderText } = render(<Search />);

    expect(getByPlaceholderText('Search documents...')).toBeInTheDocument();
  });
});
