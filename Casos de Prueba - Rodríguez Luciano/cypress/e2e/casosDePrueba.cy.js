import pageActions from '../support/pageActions.cy';
import calculatorActions from '../support/calculatorActions.cy';

describe('MovistarTestCases', function(){
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach(function(){
        calculatorActions.iniciarJson();
        pageActions.iniciarJsonIndexPage();
        cy.visit('https://tiendaonline.movistar.com.ar/');
    })

    it('CP001 - Validar cuotas en compra de equipo -Cuotas.3 -EquipoA14', function(){
        pageActions.buscar('A14');
        calculatorActions.calcular('#ui-id-3', '#selectCardByBank > ul > li');
        calculatorActions.validarOpcion('contain', '3 cuotas sin interés');
    })

    it('CP002 - Aplicar filtro de equipos -Memoria Interna.128GB -Precio Entre 200000y300000', function(){
        pageActions.filtrar('[data-value="0_1000000"] > a');
        pageActions.filtrar('[data-value="200000_300000"] > a');
        pageActions.countProducts('La cantidad de productos con memoria interna de 128GB, con un precio entre 200.000 y 300.000 es: ');
    })

    it('CP003 - Validar cuotas en compra de equipo -Cuotas.60 -Equipo.Tercero de la lista -Banco.Credicooop -Tarjeta.Visa', function(){
        pageActions.get(2);
        calculatorActions.calcular('#ui-id-21', '[data-card="Visa"] > span');
        calculatorActions.validarOpcion('not.contain', '60 cuotas sin interés');
    })

    //Descripción:
    //Este caso de prueba valida que exista la opción de comprar el equipo A04 128GB
    //en 6 cuotas sin interés de menos de $40.000 con la tarjeta Mastercard del banco ICBC.
    it('CP004 - Validar precios de cuotas en compra de equipo -EquipoA04 128GB -Banco.ICBC -Tarjeta.Mastercard -Cuotas.6 -Valor menor a.40000', function(){
        pageActions.buscar('A04 128GB');
        calculatorActions.calcular('#ui-id-28', '[data-card="Mastercard"] > span');
        var cuotaBuscada = 40001;
        const cuotas = '6 cuotas';
        cy.get('#installmentsTable > table > tbody > tr').each(($tr) => {
            cy.wrap($tr).find('td').each(($td) => {
                cy.wrap($td).find('.blue').invoke('text').then((text) => {
                    if(text.includes(cuotas)){
                        cy.wrap($td).find('.gray').invoke('text').then((text) => {
                            var valorLimpio = text.replace(/[^\d.,]/g, '');
                            var valorCuota = parseFloat(valorLimpio.replace(/\./g, '').replace(',', '.'));
                            if(valorCuota<cuotaBuscada){
                                cuotaBuscada = valorCuota;
                            }
                        }) 
                    }
                })
            });
        }).then(() => {
            expect(cuotaBuscada<40001).to.be.true;
        })
    })
    
    //Descripción:
    //Este caso de prueba valida que exista la opción de comprar cualquier equipo Xiaomi
    //en cuotas de menos de $50.000 con la tarjeta Visa del banco BBVA.
    it('CP005 - Validar precio de alguna cuota de una marca -EquiposXiaomi -Banco.BBVA Frances -Tarjeta.Visa -Valor menor a.50000', function(){
        pageActions.filtrar('[data-value="1519"] > a');
        cy.get('.products > ol > .product-item').each((_, index) => {
            pageActions.get(index);
            calculatorActions.calcular('#ui-id-12', '[data-card="Visa"] > span');
            var cuotaBuscada = 50001;
            cy.get('#installmentsTable > table > tbody > tr').each(($tr) => {
                cy.wrap($tr).find('td').each(($td) => {
                    cy.wrap($td).find('.gray').invoke('text').then((text) => {
                        var valorLimpio = text.replace(/[^\d.,]/g, '');
                        var valorCuota = parseFloat(valorLimpio.replace(/\./g, '').replace(',', '.'));
                        if(valorCuota<cuotaBuscada){
                            cuotaBuscada = valorCuota;
                        }
                    }) 
                });
            }).then(() => {
                expect(cuotaBuscada<50001).to.be.true;
            });
            calculatorActions.volver();
            pageActions.filtrar('[data-value="1519"] > a');
        })
    })
}) 