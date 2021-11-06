import {
  uniqueNamesGenerator,
  Config,
  animals,
  adjectives,
  names,
  NumberDictionary,
} from 'unique-names-generator';

const baseUrl = Cypress.env('client');

const firstNameConfig: Config = {
  dictionaries: [names],
  separator: ' ',
  length: 1,
  style: 'capital',
};

const lastNameConfig: Config = {
  dictionaries: [adjectives, animals],
  separator: '-',
  length: 2,
  style: 'capital',
};

describe('Add a row', () => {
  it('user can add a row and find it at the last page', () => {
    cy.visit(`${baseUrl}/`);
    const lastName: string = uniqueNamesGenerator(lastNameConfig);
    const firstName: string = uniqueNamesGenerator(firstNameConfig);
    const wallet = Number(NumberDictionary.generate({ min: 1, max: 1000000 })[0]);
    cy.get('[data-testid=newRowlastName]').type(lastName);
    cy.get('[data-testid=newRowfirstName]').type(firstName);
    cy.get('[data-testid=checkbox-newRow]').check();
    cy.get('[data-testid=wallet-newRow]').type(wallet.toString()).type('{enter}');
    cy.findByRole('button', { name: /add row/i }).click();

    const checkEquality = () => {
      cy.get('[data-testid="lastName-0"]').should('have.value', lastName);
      cy.get('[data-testid="firstName-0"]').should('have.value', firstName);
      cy.get('[data-testid=wallet-0]').then(($wallet) => {
        const firstRowWallet = parseFloat($wallet.val().toString().replace(/\$|,/g, ''));
        expect(firstRowWallet).to.equal(wallet);
      });
    };

    checkEquality();

    cy.get('[data-testid=sortId]').click();

    checkEquality();

    cy.get('[data-testid=checkbox-0]').should('be.checked');
  });
});

describe('Edit Row', () => {
  it('user can edit a row', () => {
    cy.visit(`${baseUrl}/`);
    const lastName: string = uniqueNamesGenerator(lastNameConfig);
    cy.get('[data-testid=sortId]').click();
    cy.get('[data-testid="lastName-1"]').clear().type(lastName);
    cy.get('[data-testid="firstName-1"]').click();
    cy.reload();
    cy.get('[data-testid=sortId]').click();
    cy.get('[data-testid="lastName-1"]').should('have.value', lastName);
  });

  it('user can delete a row', () => {
    cy.get('[data-testid=sortId]').click();
    let lastName: string;
    cy.get('[data-testid="lastName-0"]').then(($name) => (lastName = $name.val().toString()));
    cy.get('[data-testid="deleteBtn-0"').click();
    cy.reload();
    cy.get('[data-testid=sortId]').click();
    cy.get('[data-testid="lastName-0"]').should('not.equal', lastName);
  });
});
