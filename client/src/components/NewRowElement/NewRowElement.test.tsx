import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockData } from '../../shared/testing';
import NewRowElement from './NewRowElement';

describe('Testing NewRowElement', () => {
  beforeEach(() => {
    const setDataMock = jest.fn();
    const setDbCountMock = jest.fn();
    render(
      <table>
        <tbody>
          <NewRowElement
            data={mockData}
            setData={setDataMock}
            dbCount={mockData.length}
            setDbCount={setDbCountMock}
          />
        </tbody>
      </table>
    );
  });

  it('Testing checkbox behavior', async () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    userEvent.click(screen.getByRole('checkbox'));
    expect(checkbox).toBeChecked();
  });

  it('Testing warn message', async () => {
    userEvent.click(screen.getByTestId('newRowlastName'));
    userEvent.tab();
    expect(await screen.findByText(/this field is required/i)).toBeInTheDocument();
  });

  it('If mandatory fields are filled, the "Add Row" button should be enabled.', async () => {
    expect(await screen.findByRole('button', { name: /add row/i })).toBeDisabled();

    userEvent.type(screen.getByTestId('newRowlastName'), 'Ye');
    userEvent.type(screen.getByTestId('newRowfirstName'), 'Gougnaff');

    expect(await screen.findByRole('button', { name: /add row/i })).toBeEnabled();
  });
});
