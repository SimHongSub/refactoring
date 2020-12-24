plays = {
    "hamlet": {"name":  "Hamlet", "type":  "tragedy"},
    "as-like": {"name":  "As You Like It", "type":  "comedy"},
    "othello": {"name":  "Othello", "type":  "tragedy"}
};

invoices = [
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
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalvolumeCredits = totalVolumeCredits(statementData);
    statementData.totalAmount = totalAmount(statementData);

    return renderPlainText(statementData, plays);

    // 새로운 중간 데이터 형태를 만들기 위한 함수
    function enrichPerformance(aPerformance){
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);

        return result;
    }

    // play 변수 함수
    function playFor(aPerformance){
        return plays[aPerformance.playID];
    }

    // switch문 함수화
    function amountFor(aPerformance){
        let result = 0;

        switch (aPerformance.play.type){
            case "tragedy":
                result = 40000;
                if(aPerformance.audience > 30){
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if(aPerformance.audience > 20){
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
        }

        return result;
    }

    // volumeCredits 계산 함수화
    function volumeCreditsFor(aPerformance){
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);

        if("comedy" === aPerformance.play.type)
            result += Math.floor(aPerformance.audience / 5);

        return result;
    }

    // volumeCredits 누적 계산 함수화
    function totalVolumeCredits(data){
        let result = 0;

        for(let perf of data.performances) {
            result += perf.volumeCredits;
        }

        return result;
    }

    // totalAmount 계산 함수화
    function totalAmount(data){
        let result = 0;

        for(let perf of data.performances){
            result += perf.amount;
        }

        return result;
    }
}

// statement 단계를 쪼개기 위한 함수화
function renderPlainText(data, plays){
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