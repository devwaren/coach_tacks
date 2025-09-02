
const useUniqueId = (prefix = '') => {
    const uniqueId = `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    return { uniqueId };
}

export { useUniqueId }