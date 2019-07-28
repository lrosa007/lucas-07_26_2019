import React from 'react';
import { render } from '@testing-library/react';

import Search from './index';

describe('Search', () => {
  it('renders document count', () => {
    const { getByLabelText } = render(<Search />);

    expect(getByLabelText('search documents')).toBeInTheDocument();
  });
});
