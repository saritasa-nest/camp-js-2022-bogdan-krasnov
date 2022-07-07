/**
 * Create button function.
 * @param innerTextButton InnerText button.
 * @param disabled Disabled button.
 * @returns Button.
 */
export function createButtonPagination(innerTextButton: string,
  disabled = false): HTMLButtonElement {
  const buttonPaginator = document.createElement('button');
  buttonPaginator.setAttribute('data-text', innerTextButton);
  buttonPaginator.innerText = innerTextButton;
  buttonPaginator.disabled = disabled;
  return buttonPaginator;
}

/**
 * Create button function.
 * @param currentPage Current page.
 * @param quantityPage Number of pages.
 * @returns Array with strings or numbers.
 */
export function paginationDynamic(currentPage: number, quantityPage: number): Array<string | number> {
  /** * @param leftButton The left button, which is located relative to the active button. */

  const lastPage = quantityPage;
  const leftButton = currentPage - 1;
  const rightButton = currentPage + 1;
  const countedDynamicButtons = [];
  const countedDynamicButtonsWithPoints = [];
  let j = 0; // An auxiliary number that helps you understand when to add points to an array countedDynamicButtonsWithPoints.
  for (let i = 1; i <= lastPage; i++) {
    if (i === 1 || i === lastPage || (i >= leftButton && i <= rightButton)) {
      countedDynamicButtons.push(i);
    }
  }
  for (const i of countedDynamicButtons) {
    if (i - j !== 1) {
      countedDynamicButtonsWithPoints.push('...');
    }
    countedDynamicButtonsWithPoints.push(i);
    j = i;
  }
  return countedDynamicButtonsWithPoints;
}
