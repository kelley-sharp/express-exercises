const express = require('express');
const app = express();
const convertAndValidateNums = require('./helpers');

app.get('/mean', function(req, res) {
  if (!req.query.nums) {
    return res
      .status('400')
      .send(
        'must have a key of nums in your query string with comma separated numbers to find the mean'
      );
  }

  //req.query.nums is a string, separate into many strings.
  let numsAsStrings = req.query.nums.split(',');

  //check to make sure numbers given are valid
  let validNums = convertAndValidateNums(numsAsStrings);

  if (validNums instanceof Error) {
    return res.status('400').send(validNums.message);
  }

  let sum = validNums.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  let mean = sum / validNums.length;

  return res.send(`The mean of ${validNums.join(', ')} is ${mean}`);
});

app.get('/median', function(req, res) {
  if (!req.query.nums) {
    return res
      .status('400')
      .send(
        'must have a key of nums in your query string with comma separated numbers to find the median'
      );
  }

  let nums = req.query.nums.split(',');

  let validNums = convertAndValidateNums(nums);

  //order numbers least to greatest
  let numsArr = validNums.sort((a, b) => b - a);

  //if odd, return arr[(length/2) to the nearest round number.
  if (numsArr.length % 2 !== 0) {
    return res.send(numsArr[numsArr.length / 2]);
  } else {
    //else take the average of arr[length/2] and arr[(length/2)-1];
    return res.send(
      numsArr[numsArr.length / 2 + numsArr[numsArr.length / 2 - 1]]
    );
  }
});

app.listen('3000', () => console.log('listening on port 3000'));
