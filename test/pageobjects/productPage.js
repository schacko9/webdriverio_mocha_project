class ProductPage {

    get home() {
        return $('=Home')
    }
    get submit() {
        return $('.btn-success')
    }
    get name() {
        return $('//form/div[1]/input')
    }
    get email() {
        return $("input[name='email']")
    }
    get password() {
        return $("#exampleInputPassword1")
    }
    get checkbox() {
        return $("#exampleCheck1")
    }
    get dropdown() {
        return $("#exampleFormControlSelect1")
    }
    get employment() {
        return $$(".form-group div")
    }
    get birthdate() {
        return $("input[name='bday']")
    }
    get shop() {
        return $('=Shop')
    }
    get category() {
        return $('=Category 1')
    }



    async expects() {
        await expect($(".row div h1")).toHaveTextContaining('Shop Name')
        await expect(browser).toHaveTitleContaining('ProtoCommerce')
    }

    async homeClick() {
        await this.home.click()
        await browser.pause(2000)
    }

    async submitClickable() {
        await this.submit.waitForClickable()
    }

    async submitClick() {
        await this.submit.click()
    }

    async setName(value) {
        await this.name.setValue(value)
    }

    async setEmail(value) {
        await this.email.setValue(value)
    }

    async setPassword(value) {
        await this.password.setValue(value)
    }

    async setCheckbox() {
        await this.checkbox.click()
    }

    async setDropdown(value) {
        await this.dropdown.selectByVisibleText(value)
    }

    async setEmployment(value) {
        if (value === 'Student') {
            await this.employment[0].click()
        }
        else if (value === 'Employed') {
            await this.employment[1].click()
        }
        else {
            console.log("Invalid Selection")
        }
    }

    async setBirthDate(value) {
        await this.birthdate.setValue(value)
    }

    async shopClick() {
        await this.shop.click()
        await browser.pause(2000)
    }

    async categoryClick() {
        await this.category.click()
        await browser.pause(2000)
    }

   

}

module.exports = new ProductPage()