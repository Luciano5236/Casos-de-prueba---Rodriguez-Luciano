class calculatorActions {
    iniciarJson(){
        cy.fixture('calculatorJson.json').then((index) =>{
            this.index = index;
        })
    }

    validarOpcion = (condicion, texto) => {
        cy.get(this.index.tableCuotas).should(condicion ,texto);
    }

    calcular = (banco, tarjeta) => {
        cy.get(this.index.calculatorCuotas).click();
        cy.wait(500);
        cy.get(this.index.inputBank).click().get(banco).click();
        cy.get(this.index.inputCard).click().get(tarjeta).click();
        cy.get(this.index.buttonCalcular).click();
    }

    volver(){
        cy.get(this.index.buttonExitCalculator).click();
        cy.get(this.index.buttonVolver).click();
    }
}

export default new calculatorActions();