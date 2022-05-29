const expectchai = require('chai').expect

class checkoutPage {
    
    get cards() {
        return $$("div[class='card h-100']")
    }
    get productNames() {
        return $$(".media-body h4 a")
    }
    get productPrices() {
        return $$("//tr/td[4]/strong")
    }
    get stockText() {
        return $$(".media div strong")
    }
    get remove() {
        return $$(".btn-danger")
    }
    get totalPrice() {
        return $("h3 strong")
    }
    get checkout() {
        return $("button.btn-success")
    }
    get text() {
        return $("//label[@for='country']")
    }
    get delivery() {
        return $("input.form-control")
    }
    get ellipsis() {
        return $(".lds-ellipsis")
    }
    get terms() {
        return $("label[for='checkbox2']")
    }
    get continueShopping() {
        return $(".btn-default")
    }
    get purchase() {
        return $(".btn-success")
    }

    async addProductToCart(products) {

        for (let i=0; i < (await this.cards.length); i++) {
            const card = await this.cards[i].$("div h4 a")
            const text = await card.getText()
            if (products.includes(text)) {
                await this.cards[i].$(".card-footer button").click()
            }
        }
    }

    async removeProduct(phone) {
        for (let i = 0; i < await this.productNames.length; i++) {
            if ((await this.productNames[i].getText()) == phone) {
                await this.remove[i].click()
            }
        }
    }

    async statusCheck() {
        let count = 0;
        for (let i = 0; i < await this.stockText.length; i++) {
            if ((await this.stockText[i].getText()) == 'In Stock') {
                count += 1
            }
        }
        await expectchai(count).to.equal(await this.stockText.length)
    }

    async priceCheck() {
        const sumOfProducts = (await Promise.all(await this.productPrices.map(async (productPrice) => parseInt((await productPrice.getText()).split(".")[1].trim()))))
            .reduce((acc, price) => acc + price, 0)
        const TotalValue = await this.totalPrice.getText()
        const totalIntValue = parseInt(TotalValue.split(".")[1].trim())
        await expectchai(sumOfProducts).to.equal(totalIntValue)
    }

    async goToCheckout() {
        await this.checkout.click()
        await browser.pause(1000)
    }

    async expect() {
        await expect(this.text).toHaveTextContaining("delivery")
    }

    async setDeliveryLocation(value) {
        await this.delivery.setValue(value)
    }

    async waitOnEllipsis() {
        await this.ellipsis.waitForExist({ reverse: true })
    }
    async termsClick() {
        await this.terms.click()
        browser.pause(1000)
    }
    async continueShoppingClick() {
        await this.continueShopping.click()
        browser.pause(1000)
    }
    async purchaseClick() {
        await this.purchase.click()
        browser.pause(1000)
    }
}


module.exports = new checkoutPage()