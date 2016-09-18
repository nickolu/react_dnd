export const getObjectByName = function(arr,name) {
  let i = 0;
  for (i in arr) {
    if ('name' in arr[i]) {
      if (arr[i].name === name) {
        return arr[i];
      }
    }
   }
  return false;
};

export const getObjectsByProp = function(arr,prop,name) {
  let i = 0;
  let objects = [];

  for (i in arr) {
    if (prop in arr[i]) {
      if (arr[i][prop] === name) {
        objects.push(arr[i]);
      }
    }
  }
  return objects;
};

export const countItemInArray = function(arr,item) {
  let l = arr.length;
  let i = 0;
  let count = arr.indexOf('count') > -1 ? 1 : 0;
  let arrSort = arr.sort();
  console.log(count);
  for (i = 0; i < l; i += 1) {
    if (arrSort[i] === item) {
      count += 1;
    } else if (count > 0) {
      break;
    }
  }

  return count;
}

export const titleCase = function(str) {
  str = str.replace(/_/gi,' ');
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  str = str.join(' ').replace(/Of/gi, 'of');
  str = str.replace(/The/gi, 'the');
  str = str.replace(/In/gi, 'in');
  str = str.charAt(0).toUpperCase() + str.slice(1);

  return str;
}

export const getModifier = function(score) {
  let modifier = Math.floor((score - 10)/2);
  let operator = "+"
  if (modifier < 0) {
    operator = "-";
  }
  return operator+""+Math.abs(modifier);
};
