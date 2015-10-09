function insert(element, array) {
  array.splice(locationOf(element, array) + 1, 0, element);
  return array;
}

function locationOf(element, array, start, end) {
  start = start || 0;
  end = end || array.length;
  var pivot = parseInt(start + (end - start) / 2, 10);
  if (end-start <= 1 || array[pivot].order === element.order) return pivot;
  if (array[pivot].order < element.order) {
    return locationOf(element, array, pivot, end);
  } else {
    return locationOf(element, array, start, pivot);
  }
}

var SpriteGenerator = (function () {
  var _order = [];

  var add = function ( callback, order ) {
    insert( {
      order: order,
      callback: callback
    }, _order );
  }

  var create = function () {
    _.each( _order, function ( entry ) {
      entry.callback();
    } );
  }

  return {
    add: add,
    create: create
  }  
})();

module.exports = SpriteGenerator;

