import { BasePage } from './base-page'
import { expect, Locator, Page } from '@playwright/test'

export class OrderNotFoundPage extends BasePage {
  readonly notFoundTittle: Locator

  constructor(page: Page) {
    super(page)
    this.notFoundTittle = page.locator('h1.not-found__title')
  }

  async checkNotFoundTittle(): Promise<void> {
    await expect(this.notFoundTittle).toBeVisible()
    await expect(this.notFoundTittle).toHaveText('Order not found')
  }
}
