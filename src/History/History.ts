import {Move} from "./Move";

export class MoveHistory {
    moves: Move[] = [];
    current: number;

    constructor() {
        this.current = -1;
    }

    pushMove(move: any): void {
        if (this.current >= -1)
            this.moves.splice(this.current + 1);
        this.moves.push(move);
        this.current++;
    }

    back(): any {
        if (this.current >= 0) {
            return this.moves[this.current--];
        }
        return null;
    }

    forward(): any {
        if (this.current < this.moves.length) {
            return this.moves[++this.current];
        }
        return null;
    }
}

export var histories: MoveHistory = new MoveHistory();
