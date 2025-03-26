import { Page } from '@playwright/test'
import { OrderPage } from './order-page'
import { SERVICE_URL } from '../../config/env-data'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'
import { BasePage } from './base-page'

export class LoginPage extends BasePage {
  //readonly page: Page
  readonly url: string = SERVICE_URL
  readonly signInButton: Button //Locator?
  readonly usernameField: Input //Locator
  readonly passwordField: Input //Locator
  // add more locators here

  constructor(page: Page) {
    super(page);
    //this.page = page
    this.signInButton = new Button(this.page, '[data-name=signIn-button]') //page.getByTestId('signIn-button')
    this.usernameField = new Input(this.page, '[data-name="username-input"]') //page.getByTestId('username-input')
    this.passwordField = new Input(this.page, '[data-name="password-input"]') //page.getByTestId('password-input')
    // continue with the rest of the implementation below
  }

  async open() {
    await this.page.goto(this.url)
  }

  async signIn(username: string, password: string) {
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
    await this.signInButton.click()
    //console.log(num)
    return new OrderPage(this.page)
  }

  // continue with the rest of the implementation below
}
