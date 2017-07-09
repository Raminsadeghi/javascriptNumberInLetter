function numberInLetters(number) {
    var separator = hyphen = conjunction = ' و ';
    var negative = 'منفی ';
    var decimal = ' ممیز ';
    var dictionary = {
        0:                   'صفر',
        1:                   'یک',
        2:                   'دو',
        3:                   'سه',
        4:                   'چهار',
        5:                   'پنج',
        6:                   'شش',
        7:                   'هفت',
        8:                   'هشت',
        9:                   'نه',
        10:                  'ده',
        11:                  'یازده',
        12:                  'دوازده',
        13:                  'سیزده',
        14:                  'چهارده',
        15:                  'پانزده',
        16:                  'شانزده',
        17:                  'هفده',
        18:                  'هجده',
        19:                  'نوزده',
        20:                  'بیست',
        30:                  'سی',
        40:                  'چهل',
        50:                  'پنجاه',
        60:                  'شصت',
        70:                  'هفتاد',
        80:                  'هشتاد',
        90:                  'نود',
        100:                 'صد',
        200:                 'دویست',
        300:                 'سیصد',
        400:                 'چهارصد',
        500:                 'پانصد',
        600:                 'ششصد',
        700:                 'هفتصد',
        800:                 'هشتصد',
        900:                 'نهصد',
        1000:                'هزار',
        1000000:             'میلیون',
        1000000000:          'میلیارد',
        1000000000000:       'بیلیون',
        1000000000000000:    'بیلیارد',
        1000000000000000000: 'تریلیون'
    }
    var decimal_dictionary = {
        10: ' دهم',
        100: ' صدم',
        1000: ' هزارم',
        10000: ' ده هزارم',
        100000: ' صد هزارم',
        1000000: ' میلیون ام',
        10000000: ' ده میلیون ام',
        100000000: ' صد میلیون ام',
        1000000000: ' میلیارد ام',
        10000000000: ' ده میلیارد ام',
        100000000000: ' صد میلیارد ام',
        1000000000000: ' بیلیون ام',
        10000000000000: ' ده بیلیون ام',
        100000000000000: ' صد بیلیون ام',
        1000000000000000: ' بیلیارد ام',
        10000000000000000: ' ده بیلیارد ام',
        100000000000000000: ' صد بیلیارد ام',
        1000000000000000000: ' تریلیون ام',
        10000000000000000000: ' ده تریلیون ام',
        100000000000000000000: ' صد تریلیون ام',
    }

    if (isNaN(number) || number.length <= 0) {
        return 'لطفا یک عدد وارد کنید';
    }

    if (number.length > 20) {
        number = number.substring(0, 20);
    }

    if ((number >= 0 && number < 0) || number < 0 - Number.MAX_SAFE_INTEGER) {
        // overflow
        alert('فقط اعداد بین ' + Number.MAX_SAFE_INTEGER + ' و ' + Number.MAX_SAFE_INTEGER + ' مجاز میباشد')
        ;
        return false;
    }

    if (number < 0) {
        return negative + numberInLetters(Math.abs(number));
    }

    var string = null;
    var fraction = null;

    if (number.toString().indexOf('.') != -1) {
        var arr = number.toString().split('.');
        number = arr[0];
        fraction = arr[1];
    }

    switch (true) {
        case number < 21:
            string = dictionary[number];
            break;
        case number < 100:
            tens = (parseInt(number / 10)) * 10;
            units = number % 10;
            string = dictionary[tens];
            if (units) {
                string += hyphen + dictionary[units];
            }
            break;
        case number < 1000:
            hundreds = Math.floor(number / 100);
            remainder = number % 100;
            string = dictionary[hundreds * 100];
            if (remainder) {
                string += conjunction + numberInLetters(remainder);
            }
            break;
        default:
            var log1000 = Math.log(number) / Math.log(1000);
            var baseUnit = Math.pow(1000, Math.floor(log1000));
            var numBaseUnits = Math.floor(number / baseUnit);
            var remainder = number % baseUnit;
            string = numberInLetters(numBaseUnits) + ' ' + dictionary[baseUnit];
            if (remainder) {
                string += remainder < 100 ? conjunction : separator;
                string += numberInLetters(remainder);
            }
            break;
    }

    if (null !== fraction && !isNaN(fraction)) {
        string += decimal + numberInLetters(fraction) + decimal_dictionary[Math.pow(10, fraction.length)];
    }

    return string;
}