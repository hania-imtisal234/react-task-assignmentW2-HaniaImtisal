export const getRandomImage = () => {
    const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
    return `https://picsum.photos/200?random=${uniqueId}`;
}


export const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

export const getColor = (color) => {
    if (!color || typeof color !== 'string') {
        return '#F7B5CA'; 
    }
    const colors = color.split(',').map(c => c.trim().toLowerCase());
    for (let c of colors) {
        switch (c) {
            case 'fair':
                return '#F0A8D0';
            case 'gold':
                return '#F7B5CA'; 
            case 'white':
                return '#FFC6C6'; 
            case 'green':
                return '#FFEBD4'; 
            case 'light':
                return '#add8e6'; 
            case 'blue':
                return '#BC9F8B'; 
            default:
                break;
        }
    }
    return '#F7B5CA';
};

export const debounce = (callback, waitTime) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args);
        }, waitTime);
    };
};
