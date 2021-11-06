import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockData } from '../../shared/testing';
import RowElement from './RowElement';

describe('Testing RowElement', () => {
  beforeEach(() => {
    const setDataMock = jest.fn();

    render(
      <table>
        <tbody>
          <RowElement rowKey={0} data={mockData} rowElement={mockData[0]} setData={setDataMock} />
        </tbody>
      </table>
    );
  });
  
  it('Testing checkbox behavior', async () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    userEvent.click(screen.getByRole('checkbox'));
    expect(checkbox).not.toBeChecked();
  });

  it('Testing delete button', async () => {
    window.confirm = jest.fn(() => true);
    userEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(window.confirm).toBeCalled();
  });
});
