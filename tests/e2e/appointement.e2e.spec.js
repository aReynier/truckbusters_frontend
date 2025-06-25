import { test, expect } from '@playwright/test';

test.describe('Initial state', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/');
      });

    test('should the user be able to choose a time slot', async ({ page }) => {
      await page.goto('http://localhost:5173/');
      await page.waitForLoadState('networkidle');
    
      const calendar = page.getByTestId('calendar');
  
      await expect(calendar).toBeVisible();

      let dayButton = page.getByTestId('calendar__date__card__15');
      let isFifteenthDayVisible = await dayButton.isVisible();
      console.log(`Day 15 is visible: ${isFifteenthDayVisible}`);
  
      if (!isFifteenthDayVisible) {
        console.log('Day 15 is not available, testing day 14...');
        dayButton = page.getByTestId('calendar__date__card__14');
      }

      await expect(dayButton).toBeVisible();

      await dayButton.click();

      const modal = page.getByTestId('modal');
      await expect(modal).toBeVisible();

      const modalInfo = page.getByTestId('modal__window__info');
      await expect(modalInfo).toHaveText('Choix de votre heure');

      const timeSlotContainer = page.getByTestId('modal__window__content__hour__8H00');
      await expect(timeSlotContainer).toBeVisible();

      await timeSlotContainer.click();

      const form = page.getByTestId('form');
      await expect(form).toBeVisible();

      const formTitle = page.getByTestId('form__title');
      await expect(formTitle).toHaveText('Horaire choisie');
      
      console.log('Successfully completed the full flow!');
    }); 
  });
  