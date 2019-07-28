import React from 'react';
import { render } from '@testing-library/react';

import DocumentList from './index';

describe('DocumentList', () => {
  it('renders nothing when loading it true', () => {
    const { queryByText } = render(
      <DocumentList
        loading={true}
        documents={[{ id: '1', name: 'Image', size: 100 }]}
      />
    );

    expect(queryByText('Image')).toBeNull();
  });

  it('renders documents when loading it true', () => {
    const { getByText } = render(
      <DocumentList
        loading={false}
        documents={[{ id: '1', name: 'Image', size: 100 }]}
      />
    );

    expect(getByText('Image')).toBeInTheDocument();
  });
});
