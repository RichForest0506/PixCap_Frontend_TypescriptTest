import {EmployeeOrgApp} from "./EmployeeOrgApp/EmployeeOrgApp";
import {data} from "./data/data"
import {printData} from "./utility/Global";

function main():void {
    const app = new EmployeeOrgApp(data);
    printData(app.ceo, "");

    console.log("========= Move(5, 2) =========");
    app.move(5, 2);
    printData(app.ceo, "");

    console.log("========= Undo() =========");
    app.undo();
    printData(app.ceo, "");

    console.log("========= Redo() =========");
    app.redo();
    printData(app.ceo, "");
}

main();
