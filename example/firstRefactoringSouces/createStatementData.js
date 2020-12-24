// statementdata 생성 함수화
export default function createStatementData(invoice, plays){
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalvolumeCredits = totalVolumeCredits(statementData);
    statementData.totalAmount = totalAmount(statementData);

    return statementData;

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
        return data.performances.reduce((total, aPerformance) => total + aPerformance.volumeCredits, 0);
    }

    // totalAmount 계산 함수화
    function totalAmount(data){
        return data.performances.reduce((total, aPerformance) => total + aPerformance.totalAmount, 0);
    }
}