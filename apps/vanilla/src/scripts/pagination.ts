/**
 * Create button in pagination.
 * @param dataText Text for innerText and data-attribute.
 * @param disabled Disabled button.
 */
export function createPaginationButton(dataText: string,
  disabled = false): HTMLButtonElement {
  const buttonPaginator = document.createElement('button');
  buttonPaginator.className = 'pagination__button';
  buttonPaginator.setAttribute('data-text', dataText);
  buttonPaginator.innerText = dataText;
  buttonPaginator.disabled = disabled;
  return buttonPaginator;
}

/**
 * Creating dynamic buttons in pagination.
 * @param currentPage Current page.
 * @param quantityPage Number of pages.
 * @returns Array with strings or numbers.
 */
export function createDynamicPaginationButtons(currentPage: number,
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

  let rangeBetweenPointsAndNumbers = 0;
  for (const i of countedDynamicButtons) {
    if (i - rangeBetweenPointsAndNumbers !== 1) {
      countedDynamicButtonsWithPoints.push('...');
    }
    countedDynamicButtonsWithPoints.push(i);
    rangeBetweenPointsAndNumbers = i;
  }
  return countedDynamicButtonsWithPoints;
}
