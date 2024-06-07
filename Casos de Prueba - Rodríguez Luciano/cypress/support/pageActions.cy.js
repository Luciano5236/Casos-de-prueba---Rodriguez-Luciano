class pageActions{
    iniciarJsonIndexPage(){
        cy.fixture('pageJson.json').then((index) =>{
            this.index = index;
        })
    }

    buscar(elemento) {
        cy.get(this.index.inputSearch).type(elemento);
        cy.get(this.index.searchButton).click();
        cy.get(':nth-child(1) > .product-link').click();
    }

    get(index) {
        cy.get(this.index.productItems).eq(index).click();
    }

    filtrar(filtro){
        cy.get(this.index.filterButton).click();
        cy.get(filtro).click();
        cy.wait(3000);
    }

    countProducts(mensaje){
        var contador = 0;
        cy.get(this.index.productItems).each(() => {
            contador+=1
        }).then(() =>{
            cy.log(mensaje+contador);
            expect(contador!=0).to.be.true;
        });
    }
}

export default new pageActions();