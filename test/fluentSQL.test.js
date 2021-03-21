import { expect, describe, test } from '@jest/globals'
import FluentSQLBuilder from '../src/fluentSQL'

const data = [
    {
        id: 0,
        name: 'dioner',
        category: 'developer'
    },
    {
        id: 1,
        name: 'maria',
        category: 'developer'
    },
    {
        id: 2,
        name: 'joão',
        category: 'manager'
    }
]


describe('Test Suit for FluentSQL Builder', () => {
    test('#for should return a FluentSQLBuilder instance', () => {
        const result = FluentSQLBuilder.for(data)
        const expected = new FluentSQLBuilder({ database: data })
        expect(result).toStrictEqual(expected)
    })

    test('#build should return the empty object instance', () => {
        const result = FluentSQLBuilder.for(data).build()
        const expected = data
        expect(result).toStrictEqual(expected)

    })

    test('#limit given a collection it should limit results', () => {
        const result = FluentSQLBuilder.for(data).limit(1).build()
        const expected = [data[0]]
        expect(result).toStrictEqual(expected)
    })

    test('#where given a collection it should filter data', () => {
        const result = FluentSQLBuilder.for(data).where({
            category: /^dev/
        }).build()

        const expected = data.filter(({ category }) => category.slice(0, 3) === 'dev')
        expect(result).toStrictEqual(expected)
    })

    test('#select given a collection it should return only specific fields', () => {
        const result = FluentSQLBuilder.for(data).select([
            'name', 'category'
        ]).build()

        const expected = data.map(({ name, category }) => ({ name, category }))

        expect(result).toStrictEqual(expected)
    })

    test('#orderby given a collection it should order results by fields', () => {
        const result = FluentSQLBuilder.for(data).orderBy('name').build()

        const expected = [
            {
                id: 0,
                name: 'dioner',
                category: 'developer'
            },
            {
                id: 2,
                name: 'joão',
                category: 'manager'
            },
            {
                id: 1,
                name: 'maria',
                category: 'developer'
            },
            
        ]

        expect(result).toStrictEqual(expected)

    })

    test('pipeline', () => {
        const result = FluentSQLBuilder.for(data)
            .where({ category: 'developer' })
            .where({ name: /m/ })
            .select(['name', 'category'])
            .orderBy('name')
            .build()

        const expected = data.filter(({ id }) => id === 1).map(({ name, category }) => ({ name, category }))

        console.log(expected);
        console.log(result);
        expect(result).toStrictEqual(expected)
    })
})