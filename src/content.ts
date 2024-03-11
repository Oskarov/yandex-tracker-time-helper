import {projectList} from "./projectList";
import {sprintList}  from "./sprintList";


setTimeout(() => {
        let styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        setProjectInformation();
        setSprintInformation();
    }, 2000);

let styles = `
.rts-table {
    margin-left: 30px;
    border-collapse: collapse;
}
.rts-table td {
    padding: 2px 4px;
    border: 1px solid #eaeaeb;
}
       
`;

const setProjectInformation = () => {
    setInterval(() => {
        let projectPage = document.querySelector('.page_name_projects');
        if (projectPage){
            projectList();
        }
    }, 2000)
}

const setSprintInformation = () => {
    setInterval(() => {
        let projectPage = document.querySelector('.agile-board-layout');
        if (projectPage){
            sprintList();
        }
    }, 2000)
}

