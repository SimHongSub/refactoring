import {Province, sampleProvinceData} from './testSampleSource.js'
import * as assert from "assert";

describe('province', function(){
    it('shortfall', function(){
        const asia = new Province(sampleProvinceData());
        assert.equal(asia.shortfall, 5);
    });

    it('profit', function(){
        const asia = new Province(sampleProvinceData());
        assert.equal(asia.profit, 230);
    });
});