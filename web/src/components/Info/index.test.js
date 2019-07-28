import React from 'react';
import { render } from '@testing-library/react';

import Info from './index';

describe('Info', () => {
  it('renders document count', () => {
    const { getByText } = render(<Info count={6} />);

    expect(getByText('6 documents')).toBeInTheDocument();
  });

  it('renders document size with pretty format', () => {
    const { getByText } = render(<Info totalSize={1000} />);

    expect(getByText('Total size: 1kb')).toBeInTheDocument();
  });
});
