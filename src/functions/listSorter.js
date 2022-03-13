export default function listSorter(list, type) {

  if (Array.isArray(list)) {
    let titleArray = [];
    let importanceArray = [];
    let sortedArray = [];

    //make new arrays of titles, and title importance pairs

    for (let i=0; i<list.length; i++) {
        titleArray[i] = list[i].task;
        // importanceArray[i] = list[i].importance + ' ' + list[i].task;
        importanceArray[i] = {
            importance: Number(list[i].importance),
            task: list[i].task
        }
    }


    switch (type) {
        case '0':
            //newest first
            sortedArray = list.sort((a, b) => b.index - a.index).reverse();
            break;
        case '1':
            //alphabetical a-z
            titleArray.sort();
            for (let i=0; i<list.length; i++) {
                let titleIndex = titleArray.indexOf(list[i].task);
                sortedArray[titleIndex] = list[i];
            }
            
            break;
        case '2':
            //importance high to low
            importanceArray.sort((a, b) => a.importance - b.importance)
            for (let i=0; i<list.length; i++) {
                let importanceIndex = importanceArray.findIndex((item) => (item.task === list[i].task) && (Number(item.importance) === Number(list[i].importance)));
                sortedArray[importanceIndex] = list[i];
            }
            sortedArray = sortedArray.reverse();
            break;
        case '3':
            //oldest first
            let listArray = [...list];
            sortedArray = listArray;
            break;
        case '4':
            //alphabetical z-a
            titleArray.sort();
            for (let i=0; i<list.length; i++) {
                let titleIndex = titleArray.indexOf(list[i].task);
                sortedArray[titleIndex] = list[i];
            }
            
            sortedArray = sortedArray.reverse();
            break;
        case '5':
            //importance low to high
            importanceArray.sort((a, b) => a.importance - b.importance)
            for (let i=0; i<list.length; i++) {
                let importanceIndex = importanceArray.findIndex((item) => (item.task === list[i].task) && (Number(item.importance) === Number(list[i].importance)));
                sortedArray[importanceIndex] = list[i];
            }
            break;
        default:
            sortedArray = list;
            break;
    }
    return sortedArray;

} else {
    console.log('list is not an array. list: ' + list)
    return [0];
}

}