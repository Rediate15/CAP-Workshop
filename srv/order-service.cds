using {com.bookshop as db} from '../db/schema';

@requires: 'authenticated-user'
service OrderService {
    @readonly
    entity Books as projection on db.Books {
        *,
        author.surname as surname
    }

    @restrict: [
        {
            grant: '*',
            to: 'Administrator'
        },
        {
            grant: '*',
            to: 'authenticated-user',
            where: '$user = createdBy'
        }
    ]
    entity Orders as projection on db.Orders
    actions {
        action cancel();
        action submit();
        function getTotal() returns Decimal;
    }

    @requires: 'Administrator'
    action massCancel(IDs: array of UUID) returns Integer;
    @requires: 'Administrator'
    function getNumberOfSubmittedOrders() returns Decimal;
}