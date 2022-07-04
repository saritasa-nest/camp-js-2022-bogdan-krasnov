/**
 * Create button function.
 * @param innerTextButton InnerText button.
 * @returns Button.
 */
export function createButtonPagination(innerTextButton: string): HTMLButtonElement {
  const buttonPaginator = document.createElement('button');
  buttonPaginator.innerText = innerTextButton;
  return buttonPaginator;
}
