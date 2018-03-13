import { AsyncTest, Expect, Test, TestCase, TestFixture, SpyOn } from "alsatian";
import { pageCalculator, PageCalculatorOptions, PageInformation } from "./pageCalculator";

@TestFixture("pageCalculator")
export class PageCalculatorTests {

    @Test("should return list of all pages when total less than limit")
    public WhenPagesLessThanLimit() {

        const result = pageCalculator({
            total: 100,
            pageSize: 10,
            pageLimit: 10
        });

        Expect(result).toEqual({
            total: 100,
            current: 1,
            pageCount: 10,
            pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            next: 2,
            previous: false,
            showingStart: 1,
            showingEnd: 10
        });
    }

    @Test("should return limit -3 pages and last two pages when pages greater than limit and current is less than half")
    public WhenPagesGreaterThanLimitAndCurrentLessThanHalf() {

        const result = pageCalculator({
            total: 120,
            pageSize: 10,
            pageLimit: 10,
            current: 1
        });

        Expect(result).toEqual({
            total: 120,
            current: 1,
            pageCount: 12,
            pages: [1, 2, 3, 4, 5, 6, 7, "...", 11, 12],
            next: 2,
            previous: false,
            showingStart: 1,
            showingEnd: 10
        });
    }

    @Test("should return first 2 pages and 6th page to end when pages greater than limit and current less than half limit away from end")
    public WhenPagesGreaterThanLimitAndCurrentLessThanHalfFromEnd() {
        const result = pageCalculator({
            total: 120,
            pageSize: 10,
            pageLimit: 10,
            current: 12
        });

        Expect(result).toEqual({
            total: 120,
            current: 12,
            pageCount: 12,
            pages: [1, 2, "...", 6, 7, 8, 9, 10, 11, 12],
            next: false,
            previous: 11,
            showingStart: 111,
            showingEnd: 120
        });
    }

    @Test("should return first page, 5 pages around current and last two pages when large number of pages and in the first half")
    public WhenLargeNumberOfPagesAndInTheFirstHalf() {
        const result = pageCalculator({
            total: 200,
            pageSize: 10,
            pageLimit: 10,
            current: 9
        });

        Expect(result).toEqual({
            total: 200,
            current: 9,
            pageCount: 20,
            pages: [1, "...", 7, 8, 9, 10, 11, "...", 19, 20],
            next: 10,
            previous: 8,
            showingStart: 81,
            showingEnd: 90
        });
    }

    @Test("should return first two pages, 5 pages around current and last page when large number of pages and in the second half")
    public WhenLargeNumberOfPagesAndInTheSecondHalf() {
        const result = pageCalculator({
            total: 200,
            pageSize: 10,
            pageLimit: 10,
            current: 12
        });

        Expect(result).toEqual({
            total: 200,
            current: 12,
            pageCount: 20,
            pages: [1, 2, "...", 10, 11, 12, 13, 14, "...", 20],
            next: 13,
            previous: 11,
            showingStart: 111,
            showingEnd: 120
        });
    }

    @Test("should handle other variations")
    @TestCase(
        {
            total: 120,
            pageSize: 10,
            pageLimit: 10,
            current: 2
        },
        {
            total: 120,
            current: 2,
            pageCount: 12,
            pages: [1, 2, 3, 4, 5, 6, 7, "...", 11, 12],
            next: 3,
            previous: 1,
            showingStart: 11,
            showingEnd: 20
        }
    )
    @TestCase(
        {
            total: 120,
            pageSize: 10,
            pageLimit: 10,
            current: 3
        },
        {
            total: 120,
            current: 3,
            pageCount: 12,
            pages: [1, 2, 3, 4, 5, 6, 7, "...", 11, 12],
            next: 4,
            previous: 2,
            showingStart: 21,
            showingEnd: 30
        }
    )
    @TestCase(
        {
            total: 120,
            pageSize: 10,
            pageLimit: 10,
            current: 4
        },
        {
            total: 120,
            current: 4,
            pageCount: 12,
            pages: [1, 2, 3, 4, 5, 6, 7, "...", 11, 12],
            next: 5,
            previous: 3,
            showingStart: 31,
            showingEnd: 40
        }
    )
    @TestCase(
        {
            total: 120,
            pageSize: 10,
            pageLimit: 10,
            current: 5
        },
        {
            total: 120,
            current: 5,
            pageCount: 12,
            pages: [1, 2, 3, 4, 5, 6, 7, "...", 11, 12],
            next: 6,
            previous: 4,
            showingStart: 41,
            showingEnd: 50
        }
    )
    @TestCase(
        {
            total: 120,
            pageSize: 10,
            pageLimit: 10,
            current: 6
        },
        {
            total: 120,
            current: 6,
            pageCount: 12,
            pages: [1, 2, 3, 4, 5, 6, 7, "...", 11, 12],
            next: 7,
            previous: 5,
            showingStart: 51,
            showingEnd: 60
        }
    )
    @TestCase(
        {
            total: 120,
            pageSize: 10,
            pageLimit: 10,
            current: 7
        },
        {
            total: 120,
            current: 7,
            pageCount: 12,
            pages: [1, 2, "...", 6, 7, 8, 9, 10, 11, 12],
            next: 8,
            previous: 6,
            showingStart: 61,
            showingEnd: 70
        }
    )
    @TestCase(
        {
            total: 120,
            pageSize: 10,
            pageLimit: 10,
            current: 8
        },
        {
            total: 120,
            current: 8,
            pageCount: 12,
            pages: [1, 2, "...", 6, 7, 8, 9, 10, 11, 12],
            next: 9,
            previous: 7,
            showingStart: 71,
            showingEnd: 80
        }
    )
    @TestCase(
        {
            total: 150,
            pageSize: 10,
            current: 8
        },
        {
            total: 150,
            current: 8,
            pageCount: 15,
            pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            next: 9,
            previous: 7,
            showingStart: 71,
            showingEnd: 80
        }
    )
    @TestCase(
        {
            total: 8,
            pageSize: 10,
            current: 1
        },
        {
            total: 8,
            current: 1,
            pageCount: 1,
            pages: [1],
            next: false,
            previous: false,
            showingStart: 1,
            showingEnd: 8
        }
    )
    public ShouldHandleOtherVariations(options: PageCalculatorOptions, expectedResult: PageInformation) {
        const result = pageCalculator(options);
        Expect(result).toEqual(expectedResult);
    }
}
