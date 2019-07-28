import React from 'react';
import { render } from '@testing-library/react';

import Header from './index';

describe('Header', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Header>
        <span>child</span>
      </Header>
    );

    expect(getByText('child')).toBeInTheDocument();
  });
});
