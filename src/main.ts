import {EmployeeOrgApp} from "./EmployeeOrgApp/EmployeeOrgApp";
import {data} from "./data/data"
import {printData} from "./utility/Global";

function main():void {
    const app = new EmployeeOrgApp(data);
    printData(app.ceo, "");

    app.move(5, 2);
    printData(app.ceo, "");

    app.undo();
    printData(app.ceo, "");

    app.redo();
    printData(app.ceo, "");
}

main();
