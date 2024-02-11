/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { WebDriver, Builder, By, until } from 'selenium-webdriver';
import * as edge from 'selenium-webdriver/edge';

@Injectable()
export class LinkedinService {
  async scrapeProfile(profileLink: string): Promise<any> {
    const driver: WebDriver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeOptions(
        new edge.Options().addArguments(
          '--headless',
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

      await emailInput.sendKeys('solomdev0@gmail.com');
      await passwordInput.sendKeys('Eslam Wael111');
      await driver.sleep(3000);
      await loginButton.click();
      await driver.sleep(1500);
      await driver.get(profileLink);

      await driver.sleep(5000);
      const nameElement = await driver.wait(
        until.elementLocated(By.css('h1')),
        10000,
      );
      const name = await nameElement.getText();
      const photoElement = await driver.findElement(By.id('ember29'));
      const imageURL = await photoElement.getAttribute('src');
      return { name, imageURL };
    } finally {
      await driver.quit();
    }
  }
}
