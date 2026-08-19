const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const time = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    if (date.toDateString() === today.toDateString())
        return `Today, ${time}`;
    else if (date.toDateString() === yesterday.toDateString())
        return `Yesterday, ${time}`;
    else {
        const day = date.toLocaleDateString([], {day: '2-digit', month: '2-digit', year: 'numeric'});
        return `${day}, ${time}`;
    }
};