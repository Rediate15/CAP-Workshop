using {
    cuid,
    managed,
    Currency
    } from '@sap/cds/common';

namespace com.bookshop;

entity Books : managed {
    key ID: Integer;
        title: String;
        descr: String;
        stock: Integer;
        price: Decimal;
        currency: Currency;
        author: Association to Authors;
        orders: Association to many OrderItems on orders.book = $self;
}

entity Authors : managed {
    key ID: Integer;
        name: String;
        surname: String;
        books: Association to many Books on books.author = $self;
}

entity Orders: cuid, managed {
    status: Status @Common.Label: 'Status';
    country: String;
    items: Composition of many OrderItems on items.order = $self;
}

type Status : Integer enum {
    InCreation = 0;
    Submitted = 1;
    Fulfilled = 2;
    Shipped = 3;
    Cancelled = -1;
}

entity OrderItems: cuid {
    order: Association to Orders;
    book: Association to Books;
    amount: Integer;
}