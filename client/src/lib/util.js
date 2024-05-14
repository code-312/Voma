export const deleteItem = (id, array) => {
    const copy = [...array];
    const index = copy.findIndex((slot) => slot.id === id);
    copy.splice(index, 1);
    return copy;
}

export const addNewItem = (array, defaultValues) => {
  const copy = [...array];
  // generate temp random id to keep track of updates
  const valueArray = new Uint32Array(1);
  window.crypto.getRandomValues(valueArray);
  copy.push({id: valueArray[0], ...defaultValues });

  return copy;
}

export const allValid = (fields) => fields.every(field => !!field);

export const allArraysPopulated = (arrs) => arrs.every(arr => arr && arr.length > 0); 

export const checkBoxListener = (e, volunteer, updateFn) => {
    const { name, value, checked} = e.currentTarget;
    const copy = {...volunteer};
    let arrCopy = [...copy[name]];
    
    if (checked) {
        arrCopy = [...arrCopy, value];
    } else {
        arrCopy.splice(arrCopy.indexOf(value), 1);

    }
    
    updateFn(name, arrCopy);
}