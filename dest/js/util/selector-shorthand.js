const $ = {
  /**
   * Shorthand for document.querySelector
   * @param {selector} selector
   * @returns document.querySelector(selector)
  */
  one(selector) {
    return document.querySelector(selector);
  },
  /**
   * Shorthand for document.querySelectorAll
   * @param {selector} selector
   * @returns document.querySelectorAll(selector)
  */
  all(selector) {
    return document.querySelectorAll(selector);
  }
};

export default $;
