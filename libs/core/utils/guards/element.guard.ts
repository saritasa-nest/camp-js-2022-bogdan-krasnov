/**
 * Is some element an element input.
 * @param element Some element.
 */
export function isInputElement(element: HTMLElement | EventTarget): element is HTMLInputElement {
  return element instanceof HTMLInputElement;
}
