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

/**
 * gets an object from an array of objects with a matching property name and value
 * @param  {[type]} arr  [description]
 * @param  {[type]} prop [description]
 * @param  {[type]} val  [description]
 * @return {[type]}      [description]
 */
export const getObjectsByProp = function(arr,propName,val) {
  let i = 0;
  let objects = [];

  for (i in arr) {
    if (propName in arr[i]) {
      if (arr[i][propName] === val) {
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

/**
 * removes spaces and convertsa string to lowercase for easier matching
 * @param  {string} str [string to shrink]
 * @return {string}     [shrunken string]
 */
export const shrink = function(str) {
  var myStr = str;
  return myStr.replace(/\s/g, '').toLowerCase();
}

/**
   * gets a list with the specified object removed
   * @param  {array} arr  [array to remove an item from]
   * @param  {object} obj [specific object to remove]
   * @return {array}      [new array without the specified object]
   */
export const removeObject = function(arr,obj) {
  var i;
  var l = arr.length;
  var prop;
  
  for (i=0; i<l; i+=1) {
    if (arr[i] && arr[i].value === obj.value && arr[i].key === obj.key) {
      arr.splice(i,1);
    }
  }

  return arr;
}

/**
 * removes duplicates from an array and returns the new array
 * @param  {array} array [array to remove duplicates from]
 * @return {array}       [array with duplicates removed]
 */
export const arrayUnique = function(arr) {
    var a = arr.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}