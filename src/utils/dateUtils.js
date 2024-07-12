const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en', options);
    const formattedDate = formatter.format(date);

    // Add suffix to day
    const day = date.getDate();
    const suffix = getDaySuffix(day); // Function to get 'st', 'nd', 'rd', 'th'
    const formattedDay = `${day}${suffix}`;

    return `${formattedDay} of ${formattedDate}`;
};

const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};


