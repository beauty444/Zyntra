export function isEmpty(val) {
  if (Array.isArray(val)) return val.length === 0;
  if (val && typeof val === 'object') return Object.keys(val).length === 0;
  return !val;
}

export function deleteImage(_path) { return; }
export function CustomImagePath(_file) { return ''; }





