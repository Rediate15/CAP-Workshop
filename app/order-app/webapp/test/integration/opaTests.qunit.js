sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'orderapp/test/integration/FirstJourney',
		'orderapp/test/integration/pages/OrdersList',
		'orderapp/test/integration/pages/OrdersObjectPage'
    ],
    function(JourneyRunner, opaJourney, OrdersList, OrdersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('orderapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheOrdersList: OrdersList,
					onTheOrdersObjectPage: OrdersObjectPage
                }
            },
            opaJourney.run
        );
    }
);