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
        name: 'joão',
        category: 'developer'
    },
    {
        id: 2,
        name: 'maria',
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
        const expected = []
        expect(result).toStrictEqual(expected)

    })

    test('#limit given a collection it should limit results', () => {
        const result = FluentSQLBuilder.for(data).limit(1).build()
        const expected = [data[0]]
        expect(result).toStrictEqual(expected)
    })

    test('#where given a collection it should filter data', () => {

    })

    test('#select given a collection it should return only specific fields', () => {

    })

    test('#orderby given a collection it should order results by fields', () => {

    })

    test('pipeline', () => {

    })
})