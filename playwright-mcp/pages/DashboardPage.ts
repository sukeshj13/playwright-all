import { Page } from '@playwright/test';

export class DashboardPage {
  readonly heading: ReturnType<Page['getByRole']>;

  constructor(page: Page) {
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
  }
}