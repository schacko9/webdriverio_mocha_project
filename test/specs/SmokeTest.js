const base =require('../pageobjects/base')
const loginPage =require('../pageobjects/loginPage')
const productPage =require('../pageobjects/productPage')
const checkoutPage =require('../pageobjects/checkoutPage')



describe('Smoke Testing', async () => {
      
    it('Login Page - Smoke', async () => {
        await browser.url('/loginpagePractise/')
        
        await loginPage.login("rahulshettyacademy", "learning")

        await loginPage.userClick()
        await loginPage.modalDisplayed()
        await loginPage.cancelButton()

        await loginPage.userClick()
        await loginPage.modalDisplayed()
        await loginPage.okButton() 
       
        await loginPage.adminClick()
        await loginPage.modalExpects()

        await loginPage.signInClick()

        await base.checkoutClickable()
        await base.titleExpects('ProtoCommerce')
    })


    it('Product Page - Smoke', async () => {
        await browser.url('/angularpractice/shop')
        await base.checkoutClickable()
        
        await productPage.homeClick()
        await productPage.shopClick()
        await productPage.categoryClick()
        await productPage.shopClick()
    })


    it('Checkout Page - Smoke', async () => {
        await browser.url('/angularpractice/shop')
        await base.checkoutClickable()

        await base.checkoutClick()
        await checkoutPage.continueShoppingClick()

        await base.checkoutClickable()
        await base.checkoutClick()

        await checkoutPage.purchaseClick()

        await checkoutPage.expect()
        await checkoutPage.setDeliveryLocation('1234 Grovestreet Lane')
        await checkoutPage.waitOnEllipsis()
        await checkoutPage.termsClick()
        await checkoutPage.purchaseClick()

        await base.alertDisplayed()
        await base.alertExpects()
        await base.alertClose()        
    })
})