import { Locator, Page } from '@playwright/test'
import { Input } from '../atoms/Input'
import { Button } from '../atoms/Button'
import { BasePage } from './base-page'


export class OrderPage extends BasePage {
  //readonly page: Page
  readonly statusButton: Button
  readonly nameField: Input
  readonly phoneField: Input
  readonly commentField: Input
  readonly statusModel: Locator
  readonly orderNumberFiled: Input;
  readonly trackButton: Button;
  readonly createOrderButton: Button;
  readonly orderTrackingString: Locator;
  readonly SuccessfullyCreatedOrderButton: Button;

  constructor(page: Page) {
    //this.page = page
    super(page)
    this.statusButton = new Button(page,'[data-name="openStatusPopup-button"]')//page.getByTestId('openStatusPopup-button')
    this.nameField = new Input(page,'#name')
    this.phoneField = new Input(page,'#phone')
    this.commentField = new Input(page,'#comment')
    this.statusModel = page.getByTestId('search0rder-popup')
    this.orderNumberFiled = new Input(page, '[data-name="searchOrder-popup"] input')
    this.trackButton = new Button(page, '[data-name="searchOrder-popup"] button.order-search-popup__button')
    this.createOrderButton = new Button(page, '[data-name="createOrder-button"]')
    this.orderTrackingString = page.locator('[data-name="orderSuccessfullyCreated-popup"] span.notification-popup__text')
    this.SuccessfullyCreatedOrderButton = new Button(page, '[data-name="orderSuccessfullyCreated-popup-ok-button"]')
  }

  async extractTrackingCode(): Promise<string> {
    const innerText = await this.orderTrackingString.innerText();
    return innerText.split(': ')[1];

  }
}
