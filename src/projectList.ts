import {timeParser} from "./timeParser";

export const projectList = () => {
    const allRows = document.querySelectorAll('.yc-grid__row');
    const list:any[] = [];
    const developers:any = {};
    let allTimeInSeconds:number = 0;
    allRows.forEach(e=>{
        let developer = e.querySelector('.yc-user__name');
        const estimate = e.querySelector('.yc-table__cell_id_originalEstimation > a');
        let developerName:string = 'Не назначено';
        if (developer) {
            developerName = developer.innerHTML
        }
        if (estimate) {
            list.push({developer: developerName, estimate: timeParser(estimate.innerHTML)})
        }
    });
    list.forEach(item=>{
        if (developers[item.developer]){
            developers[item.developer] = developers[item.developer] + item.estimate;
        } else {
            developers[item.developer] = item.estimate;
        }
        allTimeInSeconds += item.estimate;
    });
    let container = document.querySelector('.project-issue-list-tab__body');
    if (container) {
        let block = container.querySelector('#projBlock');
        const newTable = document.createElement('table');
        newTable.className = 'rts-table';
        newTable.id = 'projBlock';
        newTable.innerHTML = `${Object.keys(developers).map(key=>`
            <tr>
                <td>${key}</td>
                <td>${developers[key] / 60 / 60} h</td>
            </tr>
        `)}
        <tr>
            <td>Все</td>
            <td>${allTimeInSeconds / 60 / 60} h</td>
        </tr>
        `
        if (block){
            block.remove();
        }
        container.appendChild(newTable);
    }
}