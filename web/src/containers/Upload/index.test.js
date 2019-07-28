import React from 'react';
import { render } from '@testing-library/react';

import Upload from './index';

describe('Upload', () => {
  it('renders upload label', () => {
    const { getByLabelText } = render(<Upload />);

    expect(getByLabelText('UPLOAD')).toBeInTheDocument();
  });
});
