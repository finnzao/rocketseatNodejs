import { DomainEvent } from '../events/domain-event'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { AggregateRoot } from '../entities/aggregate-root'
import { DomainEvents } from '@/core/events/domain-events'
import { vi } from 'vitest'
class CustomAggregateCreated implements DomainEvent {
    public ocurredAt: Date
    private aggregate: CustomAggregate
    constructor(aggregate: CustomAggregate) {
        this.aggregate = aggregate
        this.ocurredAt = new Date()
    }
    public getAggregateId(): UniqueEntityID {
        return this.aggregate.id
    }
}
class CustomAggregate extends AggregateRoot<null> {
    static create() {
        const aggregate = new CustomAggregate(null)
        aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))
        return aggregate
    }
}
describe('domain events', () => {
    it('should be able to dispatch and listen to events', async () => {
        // fn: função vazio que retorna se ela foi chamada ou não
        const callbackSpy = vi.fn()
        // callbackSpy será invocado somente quando um CustomAggregateCreated ocorrer.
        DomainEvents.register(callbackSpy, CustomAggregateCreated.name)
        DomainEvents.register(() => { console.log("disparou") }
            , CustomAggregateCreated.name
        )

        const aggregate = CustomAggregate.create()

        expect(aggregate.domainEvents).toHaveLength(1);

        DomainEvents.dispatchEventsForAggregate(aggregate.id)

        expect(callbackSpy).toHaveBeenCalled()
    })
})