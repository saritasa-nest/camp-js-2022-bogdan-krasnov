/**
 * Create button function.
 * @param innerTextButton InnerText button.
 * @param disabled Disabled button.
 * @returns Button.
 */
export function createButtonPagination(innerTextButton: string,
  disabled = false): HTMLButtonElement {
  const buttonPaginator = document.createElement('button');
  buttonPaginator.setAttribute('innerText', innerTextButton);
  buttonPaginator.innerText = innerTextButton;
  buttonPaginator.disabled = disabled;

  return buttonPaginator;
}
