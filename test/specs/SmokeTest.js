const loginPage = require('../pageobjects/loginPage')
const shopPage = require('../pageobjects/productPage')
const reviewPage = require('../pageobjects/checkoutPage')
const expectchai = require('chai').expect
const fs = require('fs')
let data = JSON.parse(fs.readFileSync('test/testData/Logins.json'))



describe('Smoke Testing', async () => {
    
   
    it('Login Page - Smoke', async () => {
        await browser.url('/loginpagePractise/')
        console.log(await browser.getTitle())
        await expect(browser).toHaveTitleContaining('Rahul Shetty Academy')

        await $("#username").setValue("rahulshettyacademy")
        await $("#password").setValue("learning")
        await $("#signInBtn").click()

        await browser.pause(4000)
        let link = await $("*=Checkout")
        await link.waitForExist()
        await expect(browser).toHaveTitleContaining('ProtoCommerce')
        console.log(await browser.getTitle())
    })


    it('Product Page - Smoke', async () => {
        await browser.url('/angularpractice/shop')

        await $('=Home').click()
        let link = await $("h1=Protractor Tutorial")
        await link.waitForExist()

        await $('=Shop').click()
        let link2 = await $("*=Checkout")
        await link2.waitForExist()

        await $('=Category 1').click()
        await link.waitForExist()

        await $('=Shop').click()
        await link2.waitForExist()
        await link2.click()
    })


    it('Checkout Page - Smoke', async () => {
        await browser.url('/angularpractice/shop')
        await $("*=Checkout").click()

        let link = await $("button.btn-default")
        await link.waitForExist()
        await link.click()
        browser.pause(1000)

        let link2 = await $("*=Checkout")
        await link2.waitForExist()
        await link2.click()
        browser.pause(1000)

        let link3 = await $("button.btn-success")
        await link3.waitForExist()
        await link3.click()
        browser.pause(1000)


        await expect($("//label[@for='country']")).toHaveTextContaining("delivery")
        await $("input.form-control").setValue('1234 Grovestreet Lane')
        await $("label[for='checkbox2']").click()
        await $("input.btn-success").click()

        await $('div.alert').waitForDisplayed()
        await expect($('div.alert')).toHaveTextContaining("Success!")
        await $("a.close").click()
        browser.pause(1000)
    })
})