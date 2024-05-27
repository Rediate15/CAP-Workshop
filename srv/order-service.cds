using {com.bookshop as db} from '../db/schema';

service OrderService {
    entity Books as projection on db.Books {
        *,
        author.surname as surname
    }

    entity Orders as projection on db.Orders {
        *,
        status @readonly
    }
    actions {
        action cancel();
        action submit();
        function getTotal() returns Decimal;
    }

    action massCancel(IDs: array of UUID) returns Integer;
    function getNumberOfSubmittedOrders() returns Decimal;
}