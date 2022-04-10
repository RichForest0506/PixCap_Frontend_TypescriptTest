import {Employee} from "../Employee/Employee";

export class Move {
    employeeID: number;
    oldSupervisorID: number;
    newSupervisorID: number;
    subordinates: Employee[];
}
