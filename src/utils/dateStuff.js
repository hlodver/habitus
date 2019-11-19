export function equalDates(d1,d2){
    return d1.getDay() === d2.getDay() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
}

export function markedToday(list){
    const d1 = new Date();
    return list.some(d2 => equalDates(d1,d2))
}

export function countLastXDays(list, x){
    let last = new Date();
    let first = new Date();
    first.setDate(first.getDate()-x);
    first.setHours(0,0,0,0);
    return list.filter(m => (m <= last && m >= first)).length;
}

export function fixDatesFromState(obj){
    // Read from local storage and cast marked items to date objecs
    if (obj){
        let s = {...obj};
        if('habits' in obj){
            obj.habits.forEach(h => {
               if ('marked' in h){
                   h.marked = h.marked.map( m => new Date(m));
               }
            });
            return s;
        }
    }
    return {};
}

