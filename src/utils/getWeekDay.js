export default function getWeekDay() {
    let today = new Date().getUTCDay();
    let tomorrow,
        afterTomorrow,
        afterAfterTomorrow;

    switch (today) {
        case 0:
            tomorrow = 1,
            afterTomorrow = 2,
            afterAfterTomorrow = 3;
            break;
        case 1:
            tomorrow = 2,
            afterTomorrow = 3,
            afterAfterTomorrow = 4;
            break;
        case 2:
            tomorrow = 3,
            afterTomorrow = 4,
            afterAfterTomorrow = 5;
            break;
        case 3:
            tomorrow = 4,
            afterTomorrow = 5,
            afterAfterTomorrow = 6;
            break;
        case 4:
            tomorrow = 5,
            afterTomorrow = 6,
            afterAfterTomorrow = 0;
            break;
        case 5:
            tomorrow = 6,
            afterTomorrow = 0,
            afterAfterTomorrow = 1;
            break;
        case 6:
            tomorrow = 0,
            afterTomorrow = 1,
            afterAfterTomorrow = 2;
            break;
    }

    return {tomorrow, afterTomorrow, afterAfterTomorrow}
}