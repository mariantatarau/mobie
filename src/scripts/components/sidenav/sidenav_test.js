describe('mobie.components.sidenav', function (){
	var $compile, $rootScope, $mbSidenav, $timeout, $browser;

	function getEl (el, sel) {
		return el[0].querySelector(sel);
	}

	beforeEach(module('mobie.components.sidenav'))

	beforeEach(inject(function (_$compile_, _$rootScope_, _$browser_, _$timeout_, _$mbSidenav_) {
		$compile = _$compile_
		$mbSidenav = _$mbSidenav_
		$rootScope = _$rootScope_
		$browser = _$browser_
		$timeout = _$timeout_
	}))

	describe('mbSidenav directive', function () {
		it('should instantiate a mbSidenav directive', function () {
			var el = angular.element('<div><div mb-sidenav data-component-id="left">{{ my.value }}</div></div>');
			var mbSidenav = el.children('[mb-sidenav]');
			var scope = $rootScope.$new();
			
			el = $compile(el)(scope);

			scope.my = {
				value: 1000
			};

			scope.$digest()

			assert.equal('1000', mbSidenav.text())

			assert.equal('left', mbSidenav.attr('data-component-id'))
		})

		it('should toggle the sidenav', function () {
			var button = angular.element('<button ng-click="toggle()"></div>')
			var el = angular.element('<div><div mb-sidenav data-component-id="my-left-sidenav">{{ my.value }}</div></div>');
			el.prepend(button);

			var mbSidenav = angular.element(getEl(el, '[mb-sidenav]'));
			var scope = $rootScope.$new();
			
			el = $compile(el)(scope);

			scope.my = {
				value: 1000
			};

			scope.toggle = function () {
				return $mbSidenav('my-left-sidenav').toggle();
			};

			scope.$digest()

			assert.equal('1000', mbSidenav.text())

			assert.equal('my-left-sidenav', mbSidenav.attr('data-component-id'))

			scope.toggle();

			$rootScope.$digest()
			$timeout.flush()

			assert.ok(mbSidenav.hasClass('mb-visible'));
			assert.ok(mbSidenav.isolateScope().mbSidenavCtrl.component.isVisible);

			scope.toggle()

			$rootScope.$digest()
			$timeout.flush()

			assert.ok(!mbSidenav.hasClass('mb-visible'));
			assert.ok(!mbSidenav.isolateScope().mbSidenavCtrl.component.isVisible);
		})

		it('should support multiple sidenavs', function() {
			var scope = $rootScope.$new()
			var sidenav1 = angular.element('<div mb-sidenav data-component-id="sidenav1"></div>')
			var sidenav2 = angular.element('<div mb-sidenav data-component-id="sidenav2"></div>')
			var body = angular.element('<div></div>');
			body.append(sidenav1).append(sidenav2)

			body = $compile(body)(scope);

			$rootScope.$digest();

			var component1 = sidenav1.isolateScope().mbSidenavCtrl.component;
			var component2 = sidenav2.isolateScope().mbSidenavCtrl.component;

			assert.equal(false, component1.isVisible);
			assert.equal(false, component2.isVisible);

			$mbSidenav('sidenav1').toggle();

			$rootScope.$digest()
			$timeout.flush()

			assert.ok(component1.getVisibleState());
			assert.ok(!component2.getVisibleState());
			assert.ok(sidenav1.hasClass('mb-visible'))
			assert.ok(!sidenav2.hasClass('mb-visible'))
		})

		it('should show backdrop', function () {
			var scope = $rootScope.$new()
			var sidenav = angular.element('<div mb-sidenav data-component-id="sidenav3"></div>')
			sidenav = $compile(sidenav)(scope);

			$rootScope.$digest()

			$mbSidenav('sidenav3').toggle()

			$rootScope.$digest()
			$timeout.flush()

			assert.ok(angular.element(document.querySelector('.backdrop')).hasClass('mb-visible'))
		})

		it('should emit a not visible change start event before', function () {
			var scope = $rootScope.$new()
			var sidenav = angular.element('<div mb-sidenav data-component-id="sidenav4"></div>')
			sidenav = $compile(sidenav)(scope);

			$rootScope.$digest()

			var notVisibleChangeStartEvt = false;
			var notVisible = false;
			$mbSidenav('sidenav4').show()

			$rootScope.$digest()
			$timeout.flush()

			$mbSidenav('sidenav4').on('notVisible', function () {
				notVisible = true
			})
			$mbSidenav('sidenav4').on('notVisibleChangeStart', function () {
				notVisibleChangeStartEvt = true;
			})
			$mbSidenav('sidenav4').toggle()

			$rootScope.$digest()
			$timeout.flush()

			assert.ok(notVisibleChangeStartEvt);
			assert.equal(true, notVisible);
		})

		it('should emit a visible change start event before', function () {
			var scope = $rootScope.$new()
			var sidenav = angular.element('<div mb-sidenav data-component-id="sidenav4"></div>')
			sidenav = $compile(sidenav)(scope);

			$rootScope.$digest()

			var visibleChangeStartEvt = false;
			var visible = false;
			$mbSidenav('sidenav4').hide()

			// all of these events must be before the $animate promise
			// $rootScope.$digest()

			$mbSidenav('sidenav4').on('visible', function () {
				visible = true
			})
			$mbSidenav('sidenav4').on('visibleChangeStart', function () {
				visibleChangeStartEvt = true;
			})
			$mbSidenav('sidenav4').toggle()

			$rootScope.$digest()
			$timeout.flush()

			assert.ok(visibleChangeStartEvt);
			assert.equal(true, visible);
		})

		it('should show backdrop before show the sidenav', function () {
			var scope = $rootScope.$new()
			var sidenav = angular.element('<div mb-sidenav data-component-id="sidenav5"></div>')
			sidenav = $compile(sidenav)(scope);

			$rootScope.$digest()

			$mbSidenav('sidenav5').on('visibleChangeStart', function () {
				assert.equal(false, angular.element(document.querySelector('.backdrop')).hasClass('mb-visible'))
			})
			$mbSidenav('sidenav5').on('visible', function () {
				assert.ok(angular.element(document.querySelector('.backdrop')).hasClass('mb-visible'))
			})
			$mbSidenav('sidenav5').show()

			$rootScope.$digest()
			$timeout.flush()
		})
	})
});