describe('addtocalendar directive', function() {
  var $compile,
      $rootScope;

  beforeEach(module('jshor.angular-addtocalendar'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  function getCompiledFixture(fixture) {
    var element = getFixtureTemplate(fixture, 'addtocalendar');
    var compiled = $compile(element)($rootScope);

    $rootScope.$digest();

    return compiled;
  }

  function hasPrefixes(fixture, prefix) {
    var element = getCompiledFixture(fixture);

    return fixtureHasHtmlPrefixes(element, prefix);
  }

  it('should use the uib template when uib is passed as attribute', function() {
    expect(hasPrefixes(uibFixture, 'uib-')).toBe(true);
  });

  it('should use the default template when uib is not passed in', function() {
    expect(hasPrefixes(dropdownFixture, '')).toBe(true);
  });
});