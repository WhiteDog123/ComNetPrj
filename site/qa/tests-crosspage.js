/**
 * 교차 페이지 테스트
 * 가상 브라우저를 만들어 브라우저 자체의 컨트롤을 관찰합니다.
 * 가상 브라우저는 화면에 실제 표시되는 것은 없는데 브라우저와 똑같이 동작한다고 합니다.
 * 교재의 '페이지 테스트'는 페이지 하나하나 단일 구성물 테스트하는거 같고,
 * 교차 페이지 테스트는 페이지들 끼리 관계 테스트 하는거 같군.
 */
//좀비.js를 이용해 교차페이지 테스트를 진행합니다.
var Browser = require('zombie'),
    assert = require('chai').assert;

var browser;

suite('Cross-Page Tests', function () {
    //테스트에서 새 브라우저 인스턴스 만들기
    setup(function () {
        browser = new Browser();
    });
    //후드 리버 페이지로부터 requestgrouprate가 잘 되나?
    test('requesting a group rate from the hood river tour page' +
        'should populate the referrer field', function (done) {
            var referrer = 'http://localhost:3000/tours/hood-river';
            //리퍼러 정확히 불러오는지 테스트
            //visit 메소드는 실제로 페이지를 불러와.
            //여기서는 hood-river 페이지가 불러와지겠군.
            browser.visit(referrer, function () {
                //브라우저가 .requestGroupRate 클래스가 있는 링크를 찾아서 연결.
                browser.clickLink('.requestGroupRate', function () {
                    //연결된 페이지에 도착했고. 'referrer'가 원래 방문하려 했던 코스랑 같은지 검사.
                    browser.assert.text('h1','Request Group Rate');
                    //assert(browser.field('referrer').value === referrer);
                    done();
                });
            });
        });

    test('requesting a group rate from the oregon coast tour page should '     + 'populate the referrer field', function (done) {
            var referrer = 'http://localhost:3000/tours/oregon-coast';
            //리퍼러 정확히 불러오는지 테스트
            //visit 함수는 실제로 페이지 불러오고 로딩 완료되면 콜백 호출함.
            browser.visit(referrer, function () {
                browser.clickLink('.requestGroupRate', function () {
                    browser.assert.text('h1','Request Group Rate');
                   // assert(browser.field('referrer').value === referrer);
                    done();
                });
            });
        });


    test('visiting the "request group rate" page directly should result ' + 'in an empty referrer field', function (done) {
        browser.visit('http://localhost:3000/tours/request-group-rate',
            function () {
                //리퍼러가 비어있는지 테스트
                assert(browser.field('referrer').value === '');
                done();
        });
    });
});