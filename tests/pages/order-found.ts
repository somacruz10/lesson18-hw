import { BasePage } from './base-page'
import { expect, Locator, Page } from '@playwright/test'

export class OrderFoundPage extends BasePage {
  readonly orderName: Locator
  readonly orderPhone: Locator
  readonly orderComment: Locator

  constructor(page: Page) {
    super(page)
    this.orderName = page.locator('[data-name="order-item-0"] .order-list__description')
    this.orderPhone = page.locator('[data-name="order-item-1"] .order-list__description')
    this.orderComment = page.locator('[data-name="order-item-2"] .order-list__description')
  }

  async checkOrderNameIsCorrect(expected: string): Promise<void> {
    const innerText = await this.orderName.innerText()
    expect(expected).toEqual(innerText)
  }

  async checkOrderPhoneIsCorrect(expected: string): Promise<void> {
    const innerText = await this.orderPhone.innerText()
    expect(expected).toEqual(innerText)
  }

  async checkOrderCommentIsCorrect(expected: string): Promise<void> {
    const innerText = await this.orderComment.innerText()
    expect(expected).toEqual(innerText)
  }
}
