// 공연료 계산기 클래스
class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay
    }

    // switch문 함수화
    get amount(){
        let result = 0;

        switch (this.play.type){
            case "tragedy":
                throw '오류 발생';
            case "comedy":
                result = 30000;
                if(this.performance.audience > 20){
                    result += 10000 + 500 * (this.performance.audience - 20);
                }
                result += 300 * this.performance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${this.play.type}`);
        }

        return result;
    }

    // volumeCredits 계산 함수화
    get volumeCredits(){
        let result = 0;
        result += Math.max(this.performance.audience - 30, 0);

        if("comedy" === this.play.type)
            result += Math.floor(this.performance.audience / 5);

        return result;
    }
}

// tragedy 공연료 계산기 클래스
class TragedyCalculator extends PerformanceCalculator {

    get amount(){
        let result = 40000;
        if(this.performance.audience > 30){
            result += 1000 * (this.performance.audience - 30);
        }

        return result;
    }
}

// comedy 공연료 계산기 클래스
class ComedyCalculator extends PerformanceCalculator {

}

// statementdata 생성 함수화
export default function createStatementData(invoice, plays){
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalvolumeCredits = totalVolumeCredits(statementData);
    statementData.totalAmount = totalAmount(statementData);

    return statementData;

    // 다형성을 지원하기 위한 팩리 함수
    function createPerformanceCalculator(aPerformance, aPlay) {
        switch (aPlay.type){
            case "tragedy" : return new TragedyCalculator(aPerformance, aPlay);
            case "comedy" : return new ComedyCalculator(aPerformance, aPlay);
            default:
                throw new Error(`알 수 없는 장르: ${aPlay.type}`);
        }
        return new PerformanceCalculator(aPerformance, aPlay);
    }

    // 새로운 중간 데이터 형태를 만들기 위한 함수
    function enrichPerformance(aPerformance){
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;

        return result;
    }

    // play 변수 함수
    function playFor(aPerformance){
        return plays[aPerformance.playID];
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