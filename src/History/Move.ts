import {Employee} from "../Employee/Employee";

export interface Move {
    employeeID: number;
    oldSupervisorID: number;
    newSupervisorID: number;
    subordinates: Employee[];   //need for undo action
}
