export const timeParser = (timeString: string) => {
    const timeParts = timeString.trim().split(' ');

    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let days = 0;
    let weeks = 0;

    for (let i = 0; i < timeParts.length; i++) {
        const part = timeParts[i];
        const numericValue = parseInt(part.slice(0, -1));

        if (part.endsWith('h')) {
            hours = numericValue;
        } else if (part.endsWith('m')) {
            minutes = numericValue;
        } else if (part.endsWith('s')) {
            seconds = numericValue;
        } else if (part.endsWith('d')) {
            days = numericValue;
        } else if (part.endsWith('w')){
            weeks= numericValue;
        }
    }

    return (weeks * 5 * 8 * 60 * 60) + (days * 8 * 60 * 60) + (hours * 3600) + (minutes * 60) + seconds;
}