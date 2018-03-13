export interface PageCalculatorOptions {
    total: number;
    current?: number;
    pageSize?: number;
    pageLimit?: number;
}

export type Pages = (number | "...")[];

export interface PageInformation {
    total: number;
    current: number;
    pageCount: number;
    pages: Pages;
    next: number | false;
    previous: number | false;
    showingStart: number;
    showingEnd: number;
}

export const paginationCalculator = (options: PageCalculatorOptions): PageInformation => {
    const { total, pageLimit } = options;
    const current = options.current || 1;
    const pageSize = options.pageSize || 10;

    const pageCount = Math.ceil(total / pageSize);

    const pages = getPages(pageCount, pageLimit, current);

    const next = current < pageCount && current + 1;
    const previous = current > 1 && current - 1;

    const showingStart = current * pageSize + 1 - pageSize;

    const showingEnd = total < pageSize || current === pageCount
        ? total
        : current * pageSize;

    return {
        total,
        current,
        pageCount,
        pages,
        next,
        previous,
        showingStart,
        showingEnd
    };
};

const getPages = (pageCount: number, pageLimit: number, current: number): Pages => {
    const pages: Pages = [];

    if (pageLimit === undefined || pageCount <= pageLimit) {
        addPageRange(pages, 1, pageCount);
        return pages;
    }

    const threshold = Math.ceil(pageLimit / 2);

    if ((current - 1) <= threshold) {
        addPageRange(pages, 1, pageLimit - 3);
        addEllipsis(pages);
        addPageRange(pages, pageCount - 1, pageCount);
        return pages;
    }

    if (current + 1 > (pageCount - threshold)) {
        addPageRange(pages, 1, 2);
        addEllipsis(pages);
        addPageRange(pages, pageCount - (threshold + 1), pageCount);
        return pages;
    }

    if (current > threshold && current <= (pageCount - threshold)) {
        addPageRange(pages, 1, getStartMax(current, pageCount, pageLimit));
        addEllipsis(pages);
        addPageRange(pages, current - 2, current + 2);
        addEllipsis(pages);
        addPageRange(pages, getEndMin(current, pageCount, pageLimit), pageCount);
        return pages;
    }

    if (current > (pageCount - threshold)) {
        addPageRange(pages, 1, 2);
        addEllipsis(pages);
        addPageRange(pages, pageCount - (threshold + 1), pageCount);
        return pages;
    }

    return pages;
};

const addPageRange = (pages: Pages, start: number, end: number) => {
    for (let i = start; i < end + 1; i++) {
        pages.push(i);
    }
};

const addEllipsis = (pages: Pages) => pages.push("...");

const getStartMax = (current: number, pageCount: number, pageLimit: number) => {
    const max = (pageLimit - 7) / 2;

    return current < pageCount / 2
        ? Math.floor(max)
        : Math.ceil(max);
};

const getEndMin = (current: number, pageCount: number, pageLimit: number) => {
    const min = (pageLimit - 7) / 2;

    return pageCount + 1 - (current > pageCount / 2
        ? Math.floor(min)
        : Math.ceil(min));
};
