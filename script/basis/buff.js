class Buff {
    constructor(type) {
        this.timer = type[1];
        this.type = type;
    }


    updateTimerBy(x) {
        this.timer -= x;
    }

    buffEnd() {
        return this.timer <= 0
    }

    // two buff equal?
    equal(buffT) {
        return this.type[0] == buffT[0];
    }
}

