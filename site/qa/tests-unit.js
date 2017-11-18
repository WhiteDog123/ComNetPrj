//논리 테스트
var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;
suite('Fortune cookie tests', function(){
	test('getFortune() should return a fortune', function(){
		//getFortun 함수 실행 했을때 string 돌려받잖아. 그거 잘하는지 논리 확인.
		expect(typeof fortune.getFortune() === 'string');
	});
});
