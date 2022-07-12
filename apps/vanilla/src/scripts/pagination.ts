/**
 * Create button function in pagination.
 * @param dataText Text for innerText and data-attribute.
 * @param disabled Disabled button.
 * @returns Button.
 */
export function creatingPaginationButton(dataText: string,
  disabled = false): HTMLButtonElement {
  const buttonPaginator = document.createElement('button');
  buttonPaginator.setAttribute('data-text', dataText);
  buttonPaginator.innerText = dataText;
  buttonPaginator.disabled = disabled;
  return buttonPaginator;
}

/**
 * Create button function.
 * @param currentPage Current page.
 * @param quantityPage Number of pages.
 * @returns Array with strings or numbers.
 */
export function creatingDynamicPaginationButtons(currentPage: number,
  quantityPage: number): Array<string | number> {
  const lastPage = quantityPage;
  const leftButton = currentPage - 1;
  const rightButton = currentPage + 1;
  const countedDynamicButtons: number[] = [];
  const countedDynamicButtonsWithPoints: Array<number | string> = [];
  for (let i = 1; i <= lastPage; i++) {
    if (i === 1 || i === lastPage || (i >= leftButton && i <= rightButton)) {
      countedDynamicButtons.push(i);
    }
  }

  // An auxiliary number that helps you understand when to add points (...) to an array countedDynamicButtonsWithPoints.
  let j = 0;
  for (const i of countedDynamicButtons) {
    if (i - j !== 1) {
      countedDynamicButtonsWithPoints.push('...');
    }
    countedDynamicButtonsWithPoints.push(i);
    j = i;
  }
  return countedDynamicButtonsWithPoints;
}
