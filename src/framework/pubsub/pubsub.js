function PubSub() {
  var topics = {};
  var subUid = -1;

  var publish = function ( topic, args ) {
    if ( ! topics[ topic ] ) {
      return false;
    }

    var subscribers = topics[ topic ];
    var len = subscribers ? subscribers.length : 0;

    while ( len-- ) {
      subscribers[ len ].func( topic, args );
    }
  }

  var subscribe = function ( topic, func ) {
    if ( ! topics[ topic ] ) {
      topics[ topic ] = [];
    }

    var token = ( ++ subUid ).toString();

    topics[ topic ].push( {
      token : token,
      func : func
    } );

    return token;
  }

  return {
    publish : publish,
    subscribe : subscribe
  }
}

module.exports = PubSub;