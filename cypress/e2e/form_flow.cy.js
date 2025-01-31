describe('Complete Flow Test', () => {
  it('completes the flow from Home to Summary', () => {

    cy.visit('/');

    cy.contains('Bienvenido a Choiz').should('be.visible');    
    cy.get('button').contains('Continuar').click();
    cy.url().should('include', '?step=1');
        
    cy.get('[data-testid="label-psoriasis"]').click();
    cy.get('[data-testid="label-other"]').click();
    cy.get('[data-testid="checkbox-other"]').should('be.checked');
    cy.get('[data-testid="input-other"]').type('Otro valor');
    cy.get('[data-testid="input-other"]').should('have.value', 'Otro valor');    
    cy.get('button').contains('Continuar').click();
    cy.url().should('include', '?step=2');

    cy.get('[data-testid="label-unsure"]').click();
    cy.url().should('include', '?step=3');

    cy.get('[data-testid="label-cancer_prostata"]').click();
    cy.get('[data-testid="label-thyroid"]').click();
    cy.get('button').contains('Continuar').click();
    cy.url().should('include', '?step=4');

    cy.get('[data-testid="label-none"]').click();
    cy.get('button').contains('Continuar').click();
    cy.url().should('include', '?step=5');
    
    cy.contains('Minoxidil® Cápsulas').should('be.visible');
    cy.get('button').contains('Seleccionar').click();
    cy.url().should('include', '?step=6');

    cy.contains('Minoxidil® Cápsulas: Minoxidil 2.5 mg + Biotina 2.5 mg').should('be.visible');
    cy.contains('¿Tienes algún problema en el cuero cabelludo?: Psoriasis, Otro, Otro valor').should('be.visible');
    cy.contains('¿Hay antecedentes de caída del cabello en tu familia?: No estoy seguro').should('be.visible');
    cy.contains('¿Tienes o has tenido alguna de las siguientes condiciones médicas?: Cáncer de próstata, Problemas de tiroides').should('be.visible');
    cy.contains('¿Tienes o has tenido alguna de estas condiciones de salud mental?: No, ninguna de las anteriores').should('be.visible');
    
  });
});
