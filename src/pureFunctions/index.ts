// @ts-nocheck
export const flat = (obj, id=undefined) => {
  if (Array.isArray(obj)) {
    return obj.map((value) => flat(value));
  }
  if (Object.keys(obj).includes("ref")) {
    return flat(obj.data, obj['ref'].id)
  }
  else if (Object.keys(obj).includes("data")) {
    return flat(obj.data);
  } else {
    if(id){
      obj.id = id;
    }
    return obj;
  }
};
