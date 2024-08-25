export class TimeFormatter {
    private full: boolean;
    private lang: string;
    private long: boolean;
    private time: Date;
    private currentDate: Date;

    // Le constructeur accepte maintenant soit un nombre, soit une instance de Date
    constructor(time: number | Date, lang: string = 'en-US', long: boolean = true, full: boolean = true) {
        this.full = full;
        this.long = long;
        this.lang = lang;
        this.currentDate = new Date();

        // Si 'time' est un nombre, on le traite comme un timestamp
        if (typeof time === 'number') {
            const timetamp = time.toString().length > 10 ? time : time * 1000;
            this.time = new Date(timetamp);
        } else {
            // Sinon, on suppose que c'est une instance de Date
            this.time = time;
        }
    }

    private formatNumber(number: number): string {
        return number < 10 ? '0' + number : number.toString();
    }

    private getDocumentLang(): string {
        return this.lang;
    }

    formatTime(): string {
        const length: 'long' | 'short' = this.long ? 'long' : 'short';
        const yearOption: Intl.DateTimeFormatOptions = { day: 'numeric', month: length, year: 'numeric' };
        const monthOption: Intl.DateTimeFormatOptions = { day: 'numeric', month: length };
        const weekOption: Intl.DateTimeFormatOptions = { weekday: length };

        const sameYear = this.time.getFullYear() === this.currentDate.getFullYear();
        const timeDifferenceInDays = Math.floor((this.currentDate.getTime() - this.time.getTime()) / (24 * 60 * 60 * 1000));

        const hours = this.formatNumber(this.time.getHours());
        const minutes = this.formatNumber(this.time.getMinutes());

        const lang = this.getDocumentLang();

        let formattedTime = sameYear && this.time.toLocaleDateString() === this.currentDate.toLocaleDateString()
            ? `${hours}:${minutes}`
            : sameYear
                ? new Intl.DateTimeFormat(lang, (timeDifferenceInDays > 6 ? monthOption : weekOption)).format(this.time)
                : new Intl.DateTimeFormat(lang, yearOption).format(this.time);

        formattedTime = formattedTime[0].toUpperCase() + formattedTime.slice(1);

        return formattedTime;
    }

    formatFullTime(): string {
        const length: 'long' | 'short' = this.long ? 'long' : 'short';
        const yearOption: Intl.DateTimeFormatOptions = { day: 'numeric', month: length, year: 'numeric' };
        const monthOption: Intl.DateTimeFormatOptions = { day: 'numeric', month: length };
        const weekOption: Intl.DateTimeFormatOptions = { weekday: length };

        const sameYear = this.time.getFullYear() === this.currentDate.getFullYear();
        const timeDifferenceInDays = Math.floor((this.currentDate.getTime() - this.time.getTime()) / (24 * 60 * 60 * 1000));

        const hours = this.formatNumber(this.time.getHours());
        const minutes = this.formatNumber(this.time.getMinutes());

        const lang = this.getDocumentLang();

        let formattedTime = sameYear && this.time.toLocaleDateString() === this.currentDate.toLocaleDateString()
            ? `${hours}:${minutes}`
            : sameYear
                ? `${new Intl.DateTimeFormat(lang, (timeDifferenceInDays > 6 ? monthOption : weekOption)).format(this.time)}, ${hours}:${minutes}`
                : new Intl.DateTimeFormat(lang, yearOption).format(this.time);

        formattedTime = formattedTime[0].toUpperCase() + formattedTime.slice(1);

        return formattedTime;
    }

    formatRelativePeriod(maxUnit: keyof typeof TimeFormatter.timeUnits = 'year', minUnit: keyof typeof TimeFormatter.timeUnits = 'second'): string {
        const timestamp = this.time.getTime();
        const now = Date.now();
        const diffInMs = timestamp - now;
        const diffInSeconds = Math.round(diffInMs / 1000);

        const unitsStartTime: { [key in keyof typeof TimeFormatter.timeUnits]: number } = {
            second: now,
            minute: new Date().setSeconds(0, 0),
            hour: new Date().setMinutes(0, 0, 0),
            day: new Date().setHours(0, 0, 0, 0),
            week: (() => {
                const date = new Date();
                const day = date.getDay();
                const diff = date.getDate() - day + (day === 0 ? -6 : 1);
                return new Date(date.setDate(diff)).setHours(0, 0, 0, 0);
            })(),
            month: new Date(new Date().getFullYear(), new Date().getMonth(), 1).setHours(0, 0, 0, 0),
            year: new Date(new Date().getFullYear(), 0, 1).setHours(0, 0, 0, 0)
        };

        const lang = this.getDocumentLang();
        const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });

        let chosenUnit: keyof typeof TimeFormatter.timeUnits | undefined;
        let chosenValue: number | undefined;

        const unitOrder: (keyof typeof TimeFormatter.timeUnits)[] = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];
        const maxUnitIndex = unitOrder.indexOf(maxUnit);
        const minUnitIndex = unitOrder.indexOf(minUnit);

        for (const unit of unitOrder) {
            const valueInSeconds = TimeFormatter.timeUnits[unit];
            const absValue = Math.abs(diffInSeconds);
            if (absValue < valueInSeconds || unit === 'year') {
                chosenUnit = unit;
                chosenValue = Math.round(diffInSeconds / valueInSeconds);
                break;
            }
        }

        const chosenUnitIndex = unitOrder.indexOf(chosenUnit!);

        if (chosenUnitIndex > maxUnitIndex) {
            return this.full ? this.formatFullTime() : this.formatTime();
        }

        if (chosenUnitIndex < minUnitIndex) {
            chosenUnit = minUnit;
            chosenValue = Math.round(diffInSeconds / TimeFormatter.timeUnits[minUnit]);
        }

        const relativeTime = rtf.format(chosenValue!, chosenUnit!);
        return relativeTime;
    }

    private static timeUnits = {
        second: 1,
        minute: 60,
        hour: 60 * 60,
        day: 60 * 60 * 24,
        week: 60 * 60 * 24 * 7,
        month: 60 * 60 * 24 * 30, // Approximation
        year: 60 * 60 * 24 * 365  // Approximation
    };

    formatRelativeTime(): string {
        const now = new Date();
        const diffInSeconds = Math.floor((this.time.getTime() - now.getTime()) / 1000);

        const rtf = new Intl.RelativeTimeFormat(this.getDocumentLang(), { numeric: 'auto' });

        const timeFrames = [
            { unit: 'year', seconds: 60 * 60 * 24 * 365 },
            { unit: 'month', seconds: 60 * 60 * 24 * 30 },
            { unit: 'week', seconds: 60 * 60 * 24 * 7 },
            { unit: 'day', seconds: 60 * 60 * 24 },
            { unit: 'hour', seconds: 60 * 60 },
            { unit: 'minute', seconds: 60 },
            { unit: 'second', seconds: 1 },
        ];

        for (const frame of timeFrames) {
            const elapsed = diffInSeconds / frame.seconds;
            if (Math.abs(elapsed) >= 1) {
                return rtf.format(Math.round(elapsed), frame.unit as Intl.RelativeTimeFormatUnit);
            }
        }

        return rtf.format(0, 'second');
    }
}

export class NumberFormatter {
    private number: number;
    private lang: string;

    constructor(number: number, lang = "en-US") {
        this.number = number;
        this.lang = lang;
    }

    formatNumber(): string {
        const number = this.number;
        const formatter = new Intl.NumberFormat(this.lang, {
            notation: "compact",
            maximumFractionDigits: 1,
        });

        return formatter.format(number);
    }

    formatTime(): string {
        const nombre = this.number;
        const conversions = [
            { seuil: 60, unite: 'second', diviseur: 1 },
            { seuil: 3600, unite: 'minute', diviseur: 60 },
            { seuil: 3600 * 24, unite: 'hour', diviseur: 3600 },
            { seuil: 604800, unite: 'day', diviseur: 86400 },
            { seuil: 2629800, unite: 'week', diviseur: 604800 },
            { seuil: 31557600, unite: 'month', diviseur: 2629800 },
            { seuil: Infinity, unite: 'year', diviseur: 31557600 }
        ];

        const { seuil, unite, diviseur } = conversions.find(({ seuil }) => nombre < seuil) || conversions[conversions.length - 1];
        const quotient = seuil === Infinity ? nombre : Math.floor(nombre / diviseur);

        const options: Intl.NumberFormatOptions = {
            style: 'unit',
            unit: unite
        };

        const formateur = new Intl.NumberFormat(this.lang, options);
        return formateur.format(quotient);
    }
}
