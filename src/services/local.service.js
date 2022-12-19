const getItem = (key) => {
    const item = localStorage.getItem(key);
    if (item && item !== 'undefined') {
        const _item = JSON.parse(item);
        return _item;
    }
    return null;
};

const setItem = (key, value) => {
    localStorage.setItem(key, value);
};

const removeItem = (key) => {
    localStorage.removeItem(key);
};

export { getItem, removeItem, setItem };
