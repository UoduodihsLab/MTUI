import { format } from "date-fns";


export function localFTime(timeStr){
    const dateObject = new Date(timeStr)

    return format(dateObject, 'yyyy-MM-dd HH:mm:ss')
}