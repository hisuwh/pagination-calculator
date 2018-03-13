# pagination-calculator

[![Build Status](https://travis-ci.org/hisuwh/pagination-calculator.svg?branch=master)](https://travis-ci.org/hisuwh/pagination-calculator)
[![npm version](https://badge.fury.io/js/pagination-calculator.svg)](https://badge.fury.io/js/pagination-calculator)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/hisuwh/pagination-calculator/blob/master/LICENSE.md)

## Installation

`npm install pagination-calculator`
> Note: the package includes typings for Typescript

## Usage

```ts
import { paginationCalculator } from "pagination-calculator";

const options = {
    // see below
};

const result = paginationCalculator(options);
```

## Options
```ts
interface PageCalculatorOptions {
    total: number;                // total number of items
    current?: number;             // current page
    pageSize?: number;            // number of items per page
    pageLimit?: number;           // number of pages in array
}
```

## Result
```ts
interface PageInformation {
    total: number;                // total number of items
    current: number;              // current page
    pageCount: number;            // total number of pages
    pages: (number | "...")[];    // array of page numbers
    next: number | false;         // next page or false if end
    previous: number | false;     // previous page or false if first
    showingStart: number;         // index of first item showing on current page
    showingEnd: number;           // index of last item showing on current page
}
```
