/**
 * @fileoverview Enforce all aria-* properties are valid.
 * @author Ethan Cohen
 */

import { propName } from 'jsx-ast-utils';
import createRule from '../util/helpers/createRule';
import ariaAttributes from '../util/attributes/ARIA';
import getSuggestion from '../util/getSuggestion';


// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage = name => {
  const dictionary = Object.keys(ariaAttributes).map(aria => aria.toLowerCase());
  const suggestions = getSuggestion(name, dictionary);
  const message = `${name}: This attribute is an invalid ARIA attribute.`;

  if (suggestions.length > 0) {
    return `${message} Did you mean to use ${suggestions}?`;
  }

  return message;
};

const rule = context => ({
  JSXAttribute: attribute => {
    const name = propName(attribute);
    const normalizedName = name ? name.toUpperCase() : '';

    // `aria` needs to be prefix of property.
    if (normalizedName.indexOf('ARIA-') !== 0) {
      return;
    }

    const isValid = Object.keys(ariaAttributes).indexOf(normalizedName) > -1;

    if (isValid === false) {
      context.report({
        node: attribute,
        message: errorMessage(name),
      });
    }
  },
});

module.exports = createRule(rule);
