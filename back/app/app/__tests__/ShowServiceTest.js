describe('Show Service Test', () => {
    beforeAll(() => {
        jest.mock('../services/show')
        const showService = require('../services/show')

        showService.createShow.mockImplementation(info => {
            if (!info.category_name)
                throw new Error()
            if (!info.name)
                throw new Error()
            if (!info.description)
                throw new Error()
            if (!info.running_time)
                throw new Error()
            if (!info.age_limit)
                throw new Error()
            if (!info.poster_uri)
                throw new Error()
            if (!info.video_uri)
                throw new Error()
            if (!info.default_ticket_image_uri)
                throw new Error()
            return info
        })
    })

    test('create show', async () => {
        const showService = require('../services/show')
        const info1 = {
            "category_name": "123",
            "name": "지킬앤하이드",
            "description": "지킬앤하이드는...",
            "running_time": 228,
            "age_limit": 15,
            "poster_uri": "http://ipfs...",
            "video_uri": "http://ipfs...",
            "default_ticket_image_uri": "http://ipfs..."
        }

        const info2 = {
            "category_name": "123",
            "name": "지킬앤하이드",
            "description": "지킬앤하이드는..."
        }

        const info3 = {
            "qqqcategory_name": "123",
            "name": "지킬앤하이드",
            "qqqdescription": "지킬앤하이드는...",
            "qqqrunning_time": 228,
            "qqqage_limit": 15,
            "qqqposter_uri": "http://ipfs...",
            "qqqvideo_uri": "http://ipfs...",
            "qqqdefault_ticket_image_uri": "http://ipfs..."
        }

        expect(await showService.createShow(info1)).toStrictEqual(info1)
        try {
            expect(await showService.createShow(info2)).toThrowError('')
        } catch (e) {
        }
        try {
            expect(await showService.createShow(info3)).toThrowError('')
        } catch (e) {
        }
    })
})