export function getStateFromLocalStorage(){
    let fromLS = window.localStorage.getItem('persistedState');

    // Read from local storage and cast marked items to date objecs
    if (fromLS){
        let s = JSON.parse(fromLS);
        if('habits' in s){
            s.habits.forEach(h => {
               if ('marked' in h){
                   h.marked = h.marked.map( m => new Date(m));
               }
            });
            return s;
        }
    }
    return {};
}
