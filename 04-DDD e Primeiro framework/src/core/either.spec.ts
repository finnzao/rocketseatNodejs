import { Either, left, right } from '@/core/either'

// Either<CaseErrorType,CaseSucessType>
function doSomeThing(shouldSuccess: boolean): Either<string, number> {
    if (shouldSuccess) {
        return right(10)
    } else {
        return left('error')
    }
}

test('success result', () => {
    const result = doSomeThing(true)
    if (result.isRight()) {
        console.log(result.value)
    }
    expect(result.isRight()).toBe(true)
    expect(result.isLeft()).toBe(false)
})

test('error result', () => {
    const result = doSomeThing(false)

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
})