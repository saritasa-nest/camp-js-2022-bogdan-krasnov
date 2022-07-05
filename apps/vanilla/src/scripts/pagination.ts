/**
 * Create button function.
 * @param innerTextButton InnerText button.
 * @returns Button.
 */
export function createButtonPagination(innerTextButton: string | number,
  disabled = false,
  ): HTMLButtonElement {
  const buttonPaginator = document.createElement('button');
  buttonPaginator.innerText = String(innerTextButton);
  buttonPaginator.disabled = disabled;


  return buttonPaginator;
}
