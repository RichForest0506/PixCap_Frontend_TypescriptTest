import {Employee} from "../Employee/Employee"
import {histories} from "../History/History";
import {Move} from "../History/Move";
import {moveEmployee, removeSubordinates} from "../utility/Global";

export interface IEmployeeOrgApp {
    ceo: Employee;

    /**
     * Moves the employee with employeeID (uniqueId) under a supervisor
     (another employee) that has supervisorID (uniqueId).
     * E.g. move Bob (employeeID) to be subordinate of Georgina
     (supervisorID). * @param employeeID
     * @param supervisorID
     */
    move(employeeID: number, supervisorID: number): void;

    /** Undo last move action */
    undo(): void;

    /** Redo last undone action */
    redo(): void;
}

export class EmployeeOrgApp implements IEmployeeOrgApp {
    ceo: Employee;

    constructor(data: any) {
        this.ceo = data;
    }

    move(employeeID: number, supervisorID: number): void {
        console.log("========= Move(", employeeID, ", ", supervisorID, ") =========");
        moveEmployee(this.ceo, employeeID, supervisorID, [], true);    // Move employee
    }

    undo(): void {
        let move: Move = histories.back();
        if (move != null) {
            console.log("========= Undo(", move.employeeID, ", ", move.oldSupervisorID, ") =========");
            removeSubordinates(this.ceo, move.subordinates);
            moveEmployee(this.ceo, move.employeeID, move.oldSupervisorID, move.subordinates, false);    // Move employee
        }
    }

    redo(): void {
        let move: Move = histories.forward();
        if (move != null) {
            console.log("========= Redo(", move.employeeID, ", ", move.newSupervisorID, ") =========");
            moveEmployee(this.ceo, move.employeeID, move.newSupervisorID, [], false);    // Move employee
        }
    }
}
