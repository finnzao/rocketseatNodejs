// Error
export class Left<L, R> {
    readonly value: L

    constructor(value: L) {
        this.value = value
    }
    // Sucess on Error
    isRight(): this is Right<L, R> {
        return false
    }
    // Error on Error
    isLeft(): this is Left<L, R> {
        return true
    }
}

// Success
export class Right<L, R> {
    readonly value: R

    constructor(value: R) {
        this.value = value
    }
    // Sucess on Sucess
    isRight(): this is Right<L, R> {
        return true
    }
    // Faill on Sucess
    isLeft(): this is Left<L, R> {
        return false
    }
}

export type Either<L, R> = Left<L, R> | Right<L, R>

export const left = <L, R>(value: L): Either<L, R> => {
    return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
    return new Right(value)
}