/**
 * attempt to convert an array of strings to an array of valid numbers
 * @param {Array<String>} numsAsStrings - array of strings
 * @returns {Array<Number>} - array of numbers
 */
function convertAndValidateNums(numsAsStrings) {
  let result = [];

  for (let num of numsAsStrings) {
    result.push(+num);

    if (Number.isNaN(+num)) {
      return new Error(`${num} is not a valid number`);
    }
  }

  return result;
}

module.exports = convertAndValidateNums;
