const newData = require('./data/data.json');
const oldData = require('./data/oldData.json');
const fs = require('node:fs');

function findByName(name, data) {
  return data.find(item => item.name === name);
}

function findIndexByName(name, data) {
  return data.findIndex(item => item.name === name);
}

function save() {
  fs.writeFileSync('./data/final.json', JSON.stringify(finalData, null, 2));
}

const finalData = oldData

newData.forEach((item) => {
  const oldDataItem = findByName(item.name, oldData);
  const index = findIndexByName(item.name, finalData);

  if (oldDataItem) {
    finalData[index].value = item.value
  } else {
    finalData.push(item)
  }

  save()
})
