import React from 'react';
import { render } from '@testing-library/react';

import Document from './index';

describe('Document', () => {
  it('renders document name', () => {
    const { getByText } = render(<Document name="Image.jpeg" />);

    expect(getByText('Image.jpeg')).toBeInTheDocument();
  });

  it('renders document size with pretty format', () => {
    const { getByText } = render(<Document size={1000} />);

    expect(getByText('1kb')).toBeInTheDocument();
  });
});
