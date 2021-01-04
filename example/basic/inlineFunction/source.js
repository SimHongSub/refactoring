function rating(aDriver){
    return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(aDriver){
    return aDriver.numberOfLateDeliveries > 5;
}

function reportLines(aCustomer){
    const lines = [];
    gatherCustomerData(lines, aCustomer);
    return lines;
}

function getherCustomerData(lines, aCustomer){
    out.push(["name", aCustomer.name]);
    out.push(["location", aCustomer.location]);
}