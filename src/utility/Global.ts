import {Employee} from "../Employee/Employee";
import {histories} from "../History/History";

export function searchEmployee(element: Employee, id: number, retIndex: boolean): any {
    if (element.subordinates != null) {
        let result = null;
        for (let i = 0; result == null && i < element.subordinates.length; i++) {
            if (element.subordinates[i].uniqueId == id) {
                if (retIndex)
                    return {"supervisor": element, "idx": i};
                else
                    return element.subordinates[i];
            } else {
                result = searchEmployee(element.subordinates[i], id, retIndex);
            }
        }
        return result;
    }
    return null;
}

export function removeSubordinates(element: Employee, subordinates: Employee[]) {
    if (element.subordinates != null && element.subordinates.length !== 0) {
        let i = 0;
        while (i < element.subordinates.length) {
            let j;
            for (j = 0; j < subordinates.length; j++) {
                if (element.subordinates[i].uniqueId === subordinates[j].uniqueId) {
                    element.subordinates.splice(i, 1);
                    break;
                }
            }
            if (j >= subordinates.length) {
                removeSubordinates(element.subordinates[i], subordinates);
                i++;
            }
        }
    }
}

export function moveEmployee(ceo: Employee, employeeID: number, supervisorID: number, newSubordinates: Employee[], logHistory: boolean): void {
    // Search old supervisor and employee index in subordinates array
    let res: any = searchEmployee(ceo, employeeID, true);
    let oldSupervisor: Employee = res.supervisor;
    let employee: Employee = res.supervisor.subordinates[res.idx];

    if (oldSupervisor.uniqueId === supervisorID)
        return;

    // Remove from Old Supervisor's subordinates array
    oldSupervisor.subordinates.splice(res.idx, 1);
    oldSupervisor.subordinates.push(...employee.subordinates);

    // Search new supervisor
    let supervisor: Employee = searchEmployee(ceo, supervisorID, false);
    if (supervisor.subordinates == null)
        supervisor.subordinates = [];
    supervisor.subordinates.push(employee);
    let subordinates: Employee[] = employee.subordinates;
    employee.subordinates = newSubordinates;

    // Push move action to History array
    if (logHistory)
        histories.pushMove({
            employeeID,
            "oldSupervisorID": oldSupervisor.uniqueId,
            "newSupervisorID": supervisorID,
            "subordinates": subordinates
        });
}

export function printData(element: Employee, header: string): void {
    // console.log(JSON.stringify(element));
    console.log("Id:", header + element.uniqueId, ", Name:", element.name);
    element.subordinates.forEach((sub) => {
        printData(sub, header + element.uniqueId + "-");
    })
}
