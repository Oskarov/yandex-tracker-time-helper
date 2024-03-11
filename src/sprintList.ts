import {timeParser} from "./timeParser";

export const sprintList = () => {
    const allCards = document.querySelectorAll('.agile-issue');
    const allData:any = {};
    allCards.forEach(card=>{
        let userNameGlobal = 'Не назначено';
        let firstTimeSeconds = 0;
        let estimateSeconds = 0;

        const user = card.querySelector('.user-label');
        const additionalFields = card.querySelectorAll('.agile-additional-issue-field');
        if (additionalFields){
            additionalFields.forEach(field=>{
                const titleField = field.querySelector('.agile-additional-issue-field__title');
                const valueField = field.querySelector('.agile-additional-issue-field__value');
                if (titleField && valueField){
                    const title = titleField.innerHTML;
                    if (title == 'Первоначальная оценка'){
                        firstTimeSeconds = timeParser(valueField.innerHTML);
                    }
                    if (title == 'Затрачено времени'){
                        estimateSeconds = timeParser(valueField.innerHTML);
                    }
                }
            });
        }
        if (user){
            let data:any = user.getAttribute('data-user');
            if (data) {
                let json = JSON.parse(data);
                if (json){
                    let userName = json['name'];
                    if(userName){
                        userNameGlobal = userName;
                    }
                }
            }
        }

        if (allData[userNameGlobal]){
            allData[userNameGlobal].ft += firstTimeSeconds;
            allData[userNameGlobal].et += estimateSeconds;
        } else {
            allData[userNameGlobal]= {
                ft: firstTimeSeconds,
                et: estimateSeconds
            }
        }
    });

    let container = document.querySelector('.agile-board-name');
    if (container) {
        let block = container.querySelector('#projBlock');
        const newTable = document.createElement('table');
        newTable.className = 'rts-table';
        newTable.id = 'projBlock';
        newTable.innerHTML = `${Object.keys(allData).map(key=>`
            <tr>
                <td>${key}</td>
                <td>${allData[key].ft / 60 / 60} h</td>
                <td>${allData[key].et / 60 / 60} h</td>
            </tr>
        `)}
        `
        if (block){
            block.remove();
        }
        container.appendChild(newTable);
        console.table(allData);
    }

}