function forEachAttr(attrs, cb) {
  for(key in attrs) {
    if(attrs.hasOwnProperty(key) && key.indexOf('$') === -1) {
      cb(key, attrs[key]);
    }
  }
}