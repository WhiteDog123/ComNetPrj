//페이지 자체를 테스트 하는 템플릿
suite('Global Tests', function () {
    test('page has a valid title', function () {
        assert(document.title && document.title.match(/\S/) &&
            document.title.toUpperCase() !== 'TODO');
    });
});