suite('"About" Page Tests', function(){
    test('page should contain link to contact page', function(){
        //about 페이지가 contact 페이지의 링크를 가지는지 확인.
        assert($('a[href="/contact"]').length);
    });
});