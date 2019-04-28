const express = require('express');
const app = express();
const convertAndValidateNums = require('./helpers');

app.get('/mean', function(req, res, next) {
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

  return res.send(validNums);
});

app.listen('3000', () => console.log('listening on port 3000'));