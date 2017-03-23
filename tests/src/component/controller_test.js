import eventFixtures from '../../fixtures/events.fixture';
import angularAtc from '../../../src/component';
import CalendarRegex from '../../helpers/regex';

describe('AddtocalendarCtrl', function() {

  let controller,
      FileSaver,
      $attrs = eventFixtures.sampleEventFixture;
  
  $attrs.$observe = () => {};

  beforeEach(() => {
    angular.mock.module(angularAtc);

    angular.mock.inject(($controller, _FileSaver_) => {
      FileSaver = _FileSaver_;
      controller = $controller('AddtocalendarCtrl', { $attrs, FileSaver });
    });
  });

  it('the component should be ok', () => {
    expect(controller).to.be.ok;
  });

  describe('constructor', () => {

    it('should call the initializer', () => {
      let initSpy = sinon.spy();

      controller.init = initSpy;
      controller.constructor($attrs, FileSaver);

      expect(initSpy).to.have.been.calledOnce;
    });

    it('should call the $attrs watcher with $attrs', () => {
      let watchAttrsSpy = sinon.spy();

      controller.watchAttrs = watchAttrsSpy;
      controller.constructor($attrs, FileSaver);

      expect(watchAttrsSpy).to.have.been.calledWith($attrs);
    });

  });

  describe('watchAttrs', () => {

    it('should set the initializer function as the callback for $observe', () => {
      let observeSpy = sinon.spy();

      $attrs.$observe = observeSpy;
      controller.constructor($attrs, FileSaver);

      expect(observeSpy).to.have.been.called;
    });

  });

  describe('setTimesFromFormat', () => {

    beforeEach(() => {
      controller.setTimesFromFormat();
    });

    it('should populate the startDate and endDate props', () => {
      expect(controller.dates['startDate']).to.be.defined;
      expect(controller.dates['startDate']).to.be.a.string;
      expect(controller.dates['startDate']).to.not.be.empty;
      expect(controller.dates['endDate']).to.be.defined;
      expect(controller.dates['endDate']).to.be.a.string;
      expect(controller.dates['endDate']).to.not.be.empty;
    });

    it('should set the startDate and endDate to valid dates', () => {
      let regex = new RegExp(CalendarRegex.dateRegex);

      expect(controller.dates['startDate']).to.match(regex);
      expect(controller.dates['endDate']).to.match(regex);
    });

  });

  describe('getSanitizedData', () => {

    it('should return a non-empty object', () => {
      let result = controller.getSanitizedData();

      expect(result).to.be.an.object;
      expect(result).to.not.be.empty;
    });

  });

  describe('buildUrl', () => {

    beforeEach(() => {
      controller.buildUrl();
    });

    it('should populate the calendarUrl object', () => {
      expect(controller.calendarUrl).to.be.defined;
      expect(controller.calendarUrl).to.be.an.object;
      expect(controller.calendarUrl).to.not.be.empty;
    });

    it('should populate calendarUrl.icalendar with valid icalendar data', () => {
      let regex = new RegExp(CalendarRegex.getIcsCalendarRegex()),
          ical = controller.calendarUrl.icalendar;

      expect(ical).to.be.defined;
      expect(ical).to.be.a.string;
      expect(ical).to.not.be.empty;
      expect(ical).to.match(regex);
    });

    it('should populate calendarUrl with the required service calendar props', () => {
      let requiredProps = [
        'google',
        'yahoo',
        'microsoft'
      ],
      calendar = controller.calendarUrl;

      requiredProps.forEach(prop => {
        expect(calendar).to.have.property(prop);
        expect(calendar[prop]).to.be.defined;
        expect(calendar[prop]).to.be.a.string;
        expect(calendar[prop]).to.not.be.empty;
      });
    });

  });

  describe('dlIcal', () => {

    it('should call the saveAs FileSaver saveAs method only once', () => {
      let saveAsSpy = sinon.spy();

      controller.constructor($attrs, {
        saveAs: saveAsSpy
      });
      controller.dlIcal();

      expect(saveAsSpy).to.be.calledOnce;
    });

  });

});