import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderNotFoundPage } from '../pages/order-not-found'
import { OrderFoundPage } from '../pages/order-found'

test('signIn button disabled when incorrect data inserted', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await loginPage.signInButton.checkVisible()
  await loginPage.signInButton.checkDisabled(true);
})

test('login with correct credentials and verify order creation page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  //await orderCreationPage.statusButton.click({ force: true })
  await orderCreationPage.statusButton.checkDisabled(false);
  // verify at least few elements on the order creation page
  await orderCreationPage.nameField.checkVisible();
  await orderCreationPage.phoneField.checkVisible();
  await orderCreationPage.commentField.checkVisible();


})

test('TL-18-1 check footer on login page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  //await loginPage.checkFooterVisible(); - все видим, но сам футер высота 0 и мы ег оне видим
  await loginPage.checkFooterAttached();
  await loginPage.langButtonRu.checkVisible();
  await loginPage.langButtonEn.checkVisible();
  await loginPage.privacyPolicyLink.checkVisible()
  await loginPage.cookiePolicyLink.checkVisible()
  await loginPage.tosLink.checkVisible()
})

test('TL-18-2 check footer on login page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkFooterAttached();
  await orderPage.langButtonRu.checkVisible();
  await orderPage.langButtonEn.checkVisible();
  await orderPage.privacyPolicyLink.checkVisible()
  await orderPage.cookiePolicyLink.checkVisible()
  await orderPage.tosLink.checkVisible()
})
  test('TL-18-3 check footer not found page', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const notFoundPage = new OrderNotFoundPage(page);

    await loginPage.open()
    const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
    await orderPage.statusButton.click();
    await orderPage.orderNumberFiled.fill('12123')
    await orderPage.trackButton.click();
    await notFoundPage.checkNotFoundTittle();

    await notFoundPage.checkFooterAttached();
    await notFoundPage.langButtonRu.checkVisible();
    await notFoundPage.langButtonEn.checkVisible();
    await notFoundPage.privacyPolicyLink.checkVisible()
    await notFoundPage.cookiePolicyLink.checkVisible()
    await notFoundPage.tosLink.checkVisible()
})

test('TL-18-4 Create order and check it', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  const orderFoundPage = new OrderFoundPage(page);

  const nameInOrder = 'TestZakaz'
  const phoneInOrder = '111111'
  const commentInOrder = 'TestComment'

  await orderPage.nameField.fill(nameInOrder)
  await orderPage.phoneField.fill(phoneInOrder)
  await orderPage.commentField.fill(commentInOrder)

  const ordersResponse = page.waitForResponse(response => response.request().url().includes('orders'))
  await orderPage.createOrderButton.click();
  await ordersResponse
  const trackingNumer = await orderPage.extractTrackingCode();
  await orderPage.SuccessfullyCreatedOrderButton.click();

  await orderPage.statusButton.click();
  await orderPage.orderNumberFiled.fill(trackingNumer)
  await orderPage.trackButton.click();

  await orderFoundPage.checkOrderNameIsCorrect(nameInOrder);
  await orderFoundPage.checkOrderPhoneIsCorrect(phoneInOrder);
  await orderFoundPage.checkOrderCommentIsCorrect(commentInOrder);

  await orderFoundPage.checkFooterAttached();
  await orderFoundPage.langButtonRu.checkVisible();
  await orderFoundPage.langButtonEn.checkVisible();
  await orderFoundPage.privacyPolicyLink.checkVisible()
  await orderFoundPage.cookiePolicyLink.checkVisible()
  await orderFoundPage.tosLink.checkVisible()
})