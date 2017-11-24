'use strict';

const contextRange = document.createRange();
contextRange.setStart(document.body, 0);

export default function toHtml(string) {
  return contextRange.createContextualFragment(string);
};
