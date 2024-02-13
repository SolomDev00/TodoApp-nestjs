/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { WebDriver, Builder, By, until } from 'selenium-webdriver';
import * as edge from 'selenium-webdriver/edge';

@Injectable()
export class ScrapeService {
  async scrapeProfile(profileURL: string): Promise<any> {
    const driver: WebDriver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeOptions(
        new edge.Options().addArguments(
          // '--headless',
          '--disable-extensions',
          '--enable-chrome-browser-cloud-management',
          '--remote-debugging-port=0',
        ),
      )
      .build();

    try {
      await driver.get('https://www.linkedin.com/login');
      const emailInput = await driver.findElement(By.id('username'));
      const passwordInput = await driver.findElement(By.id('password'));
      const loginButton = await driver.findElement(
        By.css('button[type="submit"]'),
      );
      await emailInput.sendKeys('kevinmashell@gmail.com');
      await passwordInput.sendKeys('Eslam Wael111');
      await driver.sleep(3000);
      await loginButton.click();
      await driver.sleep(1500);
      await driver.get(profileURL);
      await driver.sleep(5000);
      const nameElement = await driver.wait(
        until.elementLocated(By.css('h1')),
        10000,
      );
      const name = await nameElement.getText();
      const photoElement = await driver.findElement(
        By.css(
          'div.pv-top-card__non-self-photo-wrapper m10 button img.pv-top-card-profile-picture__image pv-top-card-profile-picture__image--show evi-image ember-view',
        ),
      );
      const imageURL = await photoElement.getAttribute('src');
      return { name, imageURL };
    } finally {
      await driver.quit();
    }
  }
}
