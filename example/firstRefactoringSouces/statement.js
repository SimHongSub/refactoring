import createStatementData from './createStatementData.js';

let plays = {
    "hamlet": {"name":  "Hamlet", "type":  "tragedy"},
    "as-like": {"name":  "As You Like It", "type":  "comedy"},
    "othello": {"name":  "Othello", "type":  "tragedy"}
};

let invoices = [
    {
        "customer": "BigCo",
        "performances": [
            {
                "playID": "hamlet",
                "audience": 55
            },
            {
                "playID": "as-like",
                "audience": 35
            },
            {
                "playID": "othello",
                "audience": 40
            }
        ]
    }
];

function statement(invoice, plays){

    return renderPlainText(createStatementData(invoice, plays));
}

// statement 단계를 쪼개기 위한 함수화
function renderPlainText(data){
    let result = `청구 내역 (고객명: ${data.customer})\n`;

    for(let perf of data.performances){
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
    }

    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립 포인트: ${data.totalvolumeCredits}점\n`;

    return result;

    // format 함수화
    function usd(aNumber){
        return new Intl.NumberFormat("en-US", {
            style: "currency", currency: "USD", minimumFractionDigits: 2
        }).format(aNumber/100);
    }
}

console.log(statement(invoices[0], plays));