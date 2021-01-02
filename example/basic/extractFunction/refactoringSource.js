function printOwing(invoice){
    let outstanding = 0;

    printBanner();

    for(const o of invoice.orders){
        outstanding += o.amount;
    }

    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

    printDetails(invoice, outstanding);
}

// 배너 출력 함수 추출
function printBanner(){
    console.log("****************");
    console.log("**** 고객 채무 ****");
    console.log("****************");
}

// 세부 사항 출력 함수 추
function printDetails(invoice, outstanding){
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}