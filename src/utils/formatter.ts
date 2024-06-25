import moment from "moment";



export default class FormatterUtils{
    static formatHoursToBR(hours: Date): string{
        return moment(hours).format("HH:mm:ss");
    }

    static formatDateToBR(date: Date): string{
        return moment(date).format("DD/MM/YYYY");
    }

    static formatDateFullToBR(date: Date): string{
        return moment(date).format("DD/MM/YYYY");
    }
}