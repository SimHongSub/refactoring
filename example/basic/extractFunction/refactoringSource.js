function printOwing(invoice){

    printBanner();

    const outstanding = calculateOutstanding(invoice);

    recordDueDate(invoice);

    printDetails(invoice, outstanding);
}

// 배너 출력 함수 추출
function printBanner(){
    console.log("****************");
    console.log("**** 고객 채무 ****");
    console.log("****************");
}

// 세부 사항 출력 함수 추출
function printDetails(invoice, outstanding){
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}

// 마감일 설정 함수 추출
function recordDueDate(invoice){
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

// outstanding 게산 함수 추
function calculateOutstanding(invoice){
    let result = 0;

    for(const o of invoice.orders){
        result += o.amount;
    }

    return result;
}