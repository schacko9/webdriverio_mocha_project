const base =require('../pageobjects/base')
const loginPage =require('../pageobjects/loginPage')
const productPage =require('../pageobjects/productPage')
const checkoutPage =require('../pageobjects/checkoutPage')
const expectchai = require('chai').expect
const fs =require('fs')
let login = JSON.parse(fs.readFileSync('test/testData/Logins.json'))
let info = JSON.parse(fs.readFileSync('test/testData/Info.json'))
let products =JSON.parse(fs.readFileSync('test/testData/Products.json'))

// Smoke-Sanity Testing Block ? npx wdio run wdio.conf.js --mochaOpts.grep Smoke



describe('Regression Testing',async()=>
{

    login.forEach(({username, password, role}) =>{
    it('Login Page', async()=> {
        await browser.url('/loginpagePractise/')
        await loginPage.expects()

        await loginPage.login(username, password)

        await loginPage.studentClick()
        await loginPage.modalDisplayed()
        await loginPage.cancelButton()

        await loginPage.studentClick()
        await loginPage.modalDisplayed()
        await loginPage.okButton() 
       
        await loginPage.adminClick()
        await loginPage.modalExpects()

        await loginPage.dropdownSelection(role)

        await loginPage.checkboxClick()
        await loginPage.signInClick()
        
        await base.checkboxClickable()
        await base.titleExpects('ProtoCommerce')
    }) })


    info.forEach(({name, email, password, gender, employment, birthdate}) =>{
    it('Product Page', async () => {
        await browser.url('/angularpractice/shop')
        await base.checkboxClickable()
        await base.titleExpects('ProtoCommerce')
        await productPage.expects()

        await productPage.homeClick()
        await productPage.submitClickable()

        await productPage.setName(name)
        await productPage.setEmail(email)
        await productPage.setPassword(password)
        await productPage.setCheckbox()
        await productPage.setDropdown(gender)
        await productPage.setEmployment(employment)
        await productPage.setBirthDate(birthdate)
        await productPage.submitClick()

        await base.alertExpects()

        await productPage.shopClick()
        await productPage.categoryClick()
        await productPage.shopClick()
    }) })


    products.forEach(({productList}) =>{
    it('Checkout Page', async () => {
        await browser.url('/angularpractice/shop')
        await base.checkboxClickable()
        await base.titleExpects('ProtoCommerce')

        await checkoutPage.addProductToCart(productList)
        await base.checkboxClick()

        await checkoutPage.removeProduct('Nokia Edge')
        await checkoutPage.statusCheck() 
        await checkoutPage.priceCheck()
        await checkoutPage.goToCheckout()
        
        await checkoutPage.expect()
        await checkoutPage.setDeliveryLocation('1234 Grovestreet Lane')
        await checkoutPage.waitOnEllipsis()
        await checkoutPage.termsClick()
        await checkoutPage.purchaseClick()

        await base.alertDisplayed()
        await base.alertExpects()
        await base.alertClose()        
    }) })
})