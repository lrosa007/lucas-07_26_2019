import React from 'react';
import { render, waitForElement } from '@testing-library/react';

import App from './index';

import * as api from '../../utils/api';

jest.mock('../../utils/api');

describe('App', () => {
  beforeEach(() => {
    const data = [{ id: '1', name: 'Image', size: 1200 }];

    api.searchDocuments.mockReset();

    api.searchDocuments.mockResolvedValue({
      count: data.length,
      totalSize: data.reduce((total, doc) => {
        return total + doc.size;
      }, 0),
      documents: data,
    });
  });

  afterEach(() => {
    expect(api.searchDocuments).toHaveBeenCalled();
  });

  it('renders upload', () => {
    const { getByText } = render(<App />);

    expect(getByText('UPLOAD')).toBeInTheDocument();
  });

  it('render the search input', () => {
    const { getByPlaceholderText } = render(<App />);

    expect(getByPlaceholderText('Search documents...')).toBeInTheDocument();
  });

  it('renders the info section', async () => {
    const { getByText } = render(<App />);

    await waitForElement(() => getByText('1 documents'));

    expect(getByText('1 documents')).toBeInTheDocument();
    expect(getByText('Total size: 1kb')).toBeInTheDocument();
  });

  it('renders a document list', async () => {
    const { getByText } = render(<App />);

    await waitForElement(() => getByText('Image'));

    expect(getByText('Image')).toBeInTheDocument();
  });
});
