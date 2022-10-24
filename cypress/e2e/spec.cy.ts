describe('testing main form', () => {
  it('has all the form fields, header and button', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Calculate the distance');
    cy.get('input#origin').should('have.value', '');
    cy.get('input#destination').should('have.value', '');
    cy.get('input[name="date"]').should('have.value', '');
    cy.get('input[name="quantity"]').should('have.value', '');
    cy.get('button[type=button]').contains('Add intermediate cities');
    cy.get('button[type=submit]').contains('Go!');
  });

  it('button is disabled after click on empty form', () => {
    cy.visit('http://localhost:3000');
    cy.get('button[type=submit]').click().should('be.disabled');
  });

  it('fields are added when clicked on the button', () => {
    cy.visit('http://localhost:3000');
    cy.get('button[type=button]').contains('Add intermediate cities').click();
    cy.get('input').then(($elements) => {
      const countOfElements = $elements.length;
      expect(countOfElements).to.equal(5);
    });
  });

  it('all the fields are rendered and filled with correct values', () => {
    cy.visit(
      'http://localhost:3000/?date=2022-10-27&quantity=2&city_0=Paris&city_1=Lyon&city_2=Marseille'
    );
    cy.wait(300);
    cy.get('input').then(($els) => {
      const texts = Array.from($els, (el) => el.value);
      expect(texts).to.deep.eq([
        'Paris',
        'Lyon',
        'Marseille',
        '27.10.2022',
        '2',
      ]);
    });
  });

  it('should delete an added field by pressing a button', () => {
    cy.visit('http://localhost:3000');
    cy.get('button[type=button]').contains('Add intermediate cities').click();
    cy.get('input').then(($elements) => {
      const countOfElements = $elements.length;
      expect(countOfElements).to.equal(5);
    });
    cy.get('#delete-btn').click();
    cy.get('input').then(($elements) => {
      const countOfElements = $elements.length;
      expect(countOfElements).to.equal(4);
    });
  });

  it('should select cities and go the next page by pressing submit button', () => {
    cy.get('input#origin').type('Mars');
    cy.get('li').contains(`Marseille`).click();
    cy.get('input#origin').should('have.value', 'Marseille');
    cy.get('input#destination').type('Par');
    cy.get('li').contains(`Paris`).click();
    cy.get('input#destination').should('have.value', 'Paris');
    cy.get('input[name="date"]').type('27.11.2024');
    cy.get('input[name="quantity"]').type('3');
    cy.get('input[name="quantity"]').should('have.value', '3');
    cy.wait(2000);
    cy.get('button[type=submit]').click();
    cy.on('url:changed', (newUrl) => {
      expect(newUrl).to.contain(
        '?date=2024-11-27&quantity=3&city_0=Marseille&city_1=Paris'
      );
    });
    cy.get('body').contains('Results');
    cy.get('body').contains('Your route: Marseille - Paris');
    cy.get('body').contains('Date: 27 November 2024');
    cy.get('body').contains('Passengers: 3');
    cy.get('body').contains('Calculations:');
    cy.wait(5000);
    cy.get('body').contains('Marseille - Paris: 660 km');
    cy.get('body').contains('Total distance: 660 km');
    cy.get('a').contains('Back to the last search');
    cy.get('a').contains('Back to start');
  });
});

export {};
