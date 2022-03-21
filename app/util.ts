export function getTemplate(templateID: string): HTMLTemplateElement {
  return document.querySelector(
    `template#${templateID}`
  ) as HTMLTemplateElement;
}

export function cloneTemplate(template: HTMLTemplateElement): Element {
  return template.content.cloneNode(true) as Element;
}

export function setElementText(
  selector: string,
  value: any,
  parentElement: Element | undefined = undefined
): void {
  const element = parentElement
    ? parentElement.querySelector(selector)
    : document.querySelector(selector);
  element.textContent = value;
}
