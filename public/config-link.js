var _attributes = window.__config.prod;
const keys = Object.keys(_attributes);
for (var key of keys) {
  window[key] = _attributes[key];
}
